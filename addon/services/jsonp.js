/*global window, document*/

import { Promise } from 'rsvp';

import Service from '@ember/service';

const removeCallback = function (callbackName) {
  try {
    delete window[callbackName];
  } catch (e) {
    window[callbackName] = undefined;
  }
};

const removeScript = function (node) {
  node.parentNode.removeChild(node);
};


const removeTimeout = function (timeout) {
  clearTimeout(timeout);
};


export default Service.extend({
  safePrefix: 'jsonp',
  timeout: 10000,
  statusPending: 'PENDING',
  statusLoaded: 'LOADED',
  statusError: 'ERROR',
  callbackPattern: '{{callbackName}}',
  optionsParamName: 'paramName',
  optionsCallbackName: 'callbackName',
  callbackParam: false,
  generateCallbackName() {
    const safePrefix = this.get('safePrefix');
    const prefix = Math.random().toString(36).substring(7);
    const timeStamp = Date.now();
    const randomNumber = parseInt(Math.random()*10000);
    return `${safePrefix}_${prefix}_${timeStamp}_${randomNumber}`;
  },
  createScriptElement() {
    return document.createElement("script");
  },
  buildURLCallbackParams(paramName,callbackName) {
    return paramName?`${encodeURIComponent(paramName)}=${encodeURIComponent(callbackName)}`:'';
  },
  buildURL(uri,callbackParams,replacePattern,callbackName) {
    return `${uri.endsWith('&')?uri.slice(-1):uri}${callbackParams?`&${callbackParams}`:''}`.replace(replacePattern,encodeURIComponent(callbackName));
  },
  setupCallback(callbackName,cbTimeout,resolve,success,ctx) {
    window[callbackName] = (data) => {
      removeTimeout(cbTimeout);
      this.respond(ctx,success,resolve,data);
    };
  },
  request(uri,ctx,success,error,options) {



    if (!options) {
      options = {};
    }

    if (error && typeof error === 'object') {
      options = error;
      error = null;
    }

    if (success && typeof success === 'object') {
      options = success;
      success = null;
    }

    if (typeof ctx === 'object' && !Object.keys(options).length) {
      options = ctx;
      ctx = undefined;
    }

    if (typeof uri === 'object') {
      options = uri;
      uri = options.url || options.uri;
    }

    if (!success && options.success) {
      success = options.success;
    }

    if (!error && options.error) {
      error = options.error;
    }

    if (!ctx && options.context) {
      ctx = options.context;
    }


    return new Promise((resolve,reject)=>{

      const elem = this.createScriptElement();
      const timeout = options.timeout || this.get('timeout');
      const callbackName = options[this.get('optionsCallbackName')] || this.generateCallbackName();
      const cbParamName = options[this.get('optionsParamName')] || this.get('callbackParam');
      const replacePattern = options.pattern || this.get('callbackPattern');
      const callbackParams = this.buildURLCallbackParams(cbParamName,callbackName);
      elem.src = this.buildURL(uri,callbackParams,replacePattern,callbackName);
      let cbTimeout = this.setupElementEvents(elem,callbackName,success,error,resolve,reject,timeout,ctx);
      this.setupCallback(callbackName,cbTimeout,resolve,success,ctx);
      this.appendScriptElement(elem);
    });
  },
  cleanUp(elem,callbackName) {
    removeScript(elem);
    removeCallback(callbackName);
  },
  respond(context,callback,resolver,data) {
    if (callback) {
      callback.call(context,data);
    }
    resolver(data);
  },
  setupElementEvents(elem,callbackName,success,error,resolve,reject,timeout,ctx) {

    let STATUS = this.get('statusPending');

    let cbTimeout = setTimeout(()=>{
      if (STATUS === this.get('statusPending')) {
       this.cleanUp(elem,callbackName);
      }
      this.respond(ctx,error,reject,{
        type: "error",
        error: 'CALLBACK_TIMEOUT',
        status: STATUS
      });
    },timeout);

    elem.onload = () => {
      this.cleanUp(elem,callbackName);
      STATUS = this.get('statusLoaded');
    };

    elem.onerror = (err) => {
      this.cleanUp(elem,callbackName);
      removeTimeout(cbTimeout);
      STATUS = this.get('statusError');
      this.respond(ctx,error,reject,{
        status: STATUS,
        error: err,
        type: "error"
      });
    };

    return cbTimeout;

  },
  appendScriptElement(element) {
    document.head.appendChild(element);
  }

});

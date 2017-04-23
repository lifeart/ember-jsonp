/*global window, document*/

import Ember from 'ember';

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


export default Ember.Service.extend({
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

    const elem = this.createScriptElement();
    const timeout = options.timeout || this.get('timeout');
    const callbackName = options[this.get('optionsCallbackName')] || this.generateCallbackName();
    const cbParamName = options[this.get('optionsParamName')] || this.get('callbackParam');
    const replacePattern = options.pattern || this.get('callbackPattern');
    const callbackParams = this.buildURLCallbackParams(cbParamName,callbackName);

    elem.src = this.buildURL(uri,callbackParams,replacePattern,callbackName);

    let STATUS = this.get('statusPending');

    return new Ember.RSVP.Promise((resolve,reject)=>{


      let cbTimeout = setTimeout(()=>{
        if (STATUS === this.get('statusPending')) {
          removeScript(elem);
          removeCallback(callbackName);
        }
        let errObject = {type:"error",error:'CALLBACK_TIMEOUT',status:STATUS};
        if (error) {
          error.call(ctx,errObject);
        }
        reject(errObject);
      },timeout);


      window[callbackName] = (data) => {
        removeTimeout(cbTimeout);
        if (success) {
          success.call(ctx,data);
        }
        resolve(data);
      };

      elem.onload = () => {
        removeScript(elem);
        removeCallback(callbackName);
        STATUS = this.get('statusLoaded');
        resolve({
          status: STATUS
        });
      };

      elem.onerror = (err) => {
        removeScript(elem);
        removeCallback(callbackName);
        removeTimeout(cbTimeout);
        STATUS = this.get('statusError');
        if (error) {
          error.call(ctx,err);
        }
        reject({
          status: STATUS
        });
      };

      this.appendScriptElement(elem);
    });
  },
  appendScriptElement(element) {
    document.head.appendChild(element);
  }

});

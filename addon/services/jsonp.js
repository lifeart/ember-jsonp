/*global window, document*/

import Ember from 'ember';

export default Ember.Service.extend({
  safePrefix: 'jsonp',
  timeout: 10000,
  callbackPattern: '%callbackName%',
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

    const elem = this.createScriptElement();
    const timeout = options.timeout || this.get('timeout');
    const callbackName = options[this.get('optionsCallbackName')] || this.generateCallbackName();
    const cbParamName = options[this.get('optionsParamName')] || this.get('callbackParam');
    const replacePattern = options.pattern || this.get('callbackPattern');
    const callbackParams = this.buildURLCallbackParams(cbParamName,callbackName);

    elem.src = this.buildURL(uri,callbackParams,replacePattern,callbackName);

    let STATUS = 'PENDING';

    let cbTimeout = setTimeout(()=>{
      if (STATUS === 'PENDING') {
        elem.parentNode.removeChild(elem);
        delete window[callbackName];
      }
      if (error) {
        error.call(ctx,{type:"error",error:'CALLBACK_TIMEOUT',status:STATUS});
      }
    },timeout);

    window[callbackName] = (data) => {
      clearTimeout(cbTimeout);
      if (success) {
        success.call(ctx,data);
      }
    };

    elem.onload = function() {
      this.parentNode.removeChild(this);
      STATUS = 'LOADED';
      delete window[callbackName];
    };

    elem.onerror = function (err) {
      this.parentNode.removeChild(this);
      delete window[callbackName];
      STATUS = 'ERROR';
      clearTimeout(cbTimeout);
      if (error) {
        error.call(ctx,err);
      }
    };

    this.appendScriptElement(elem);

    return this;
  },
  appendScriptElement(element) {
    document.head.appendChild(element);
  }

});

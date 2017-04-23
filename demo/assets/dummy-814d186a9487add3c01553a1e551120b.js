"use strict";define("dummy/app",["exports","ember","dummy/resolver","ember-load-initializers","dummy/config/environment"],function(e,t,n,a,i){var r=void 0;t.default.MODEL_FACTORY_INJECTIONS=!0,r=t.default.Application.extend({modulePrefix:i.default.modulePrefix,podModulePrefix:i.default.podModulePrefix,Resolver:n.default}),(0,a.default)(r,i.default.modulePrefix),e.default=r}),define("dummy/components/app-version",["exports","ember-cli-app-version/components/app-version","dummy/config/environment"],function(e,t,n){var a=n.default.APP.name,i=n.default.APP.version;e.default=t.default.extend({version:i,name:a})}),define("dummy/controllers/application",["exports","ember"],function(e,t){var n=t.default.inject.service,a=t.default.computed,i=t.default.observer,r=t.default.on;e.default=t.default.Controller.extend({jsonp:n(),init:function(){this.set("searchTag","emberconf")},items:a(function(){return[]}),searchTag:"",getFlickerURI:function(){return"//api.flickr.com/services/feeds/photos_public.gne?tags="+encodeURIComponent(this.get("searchTag"))+"&format=json"},searchTagDidChange:r("init",i("searchTag",function(){var e=this,t=this.getFlickerURI();this.get("jsonp").request(t,this,function(t){e.set("items",t.items)},function(e){console.log(e)},{paramName:"jsoncallback"})}))})}),define("dummy/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){e.default=t.default}),define("dummy/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){e.default=t.default}),define("dummy/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","dummy/config/environment"],function(e,t,n){e.default={name:"App Version",initialize:(0,t.default)(n.default.APP.name,n.default.APP.version)}}),define("dummy/initializers/container-debug-adapter",["exports","ember-resolver/container-debug-adapter"],function(e,t){e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0];e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("dummy/initializers/data-adapter",["exports","ember"],function(e,t){e.default={name:"data-adapter",before:"store",initialize:function(){}}}),define("dummy/initializers/ember-data",["exports","ember-data/setup-container","ember-data/-private/core"],function(e,t,n){e.default={name:"ember-data",initialize:t.default}}),define("dummy/initializers/export-application-global",["exports","ember","dummy/config/environment"],function(e,t,n){function a(){var e=arguments[1]||arguments[0];if(!1!==n.default.exportApplicationGlobal){var a;if("undefined"!=typeof window)a=window;else if("undefined"!=typeof global)a=global;else{if("undefined"==typeof self)return;a=self}var i,r=n.default.exportApplicationGlobal;i="string"==typeof r?r:t.default.String.classify(n.default.modulePrefix),a[i]||(a[i]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete a[i]}}))}}e.initialize=a,e.default={name:"export-application-global",initialize:a}}),define("dummy/initializers/injectStore",["exports","ember"],function(e,t){e.default={name:"injectStore",before:"store",initialize:function(){}}}),define("dummy/initializers/store",["exports","ember"],function(e,t){e.default={name:"store",after:"ember-data",initialize:function(){}}}),define("dummy/initializers/transforms",["exports","ember"],function(e,t){e.default={name:"transforms",before:"store",initialize:function(){}}}),define("dummy/instance-initializers/ember-data",["exports","ember-data/-private/instance-initializers/initialize-store-service"],function(e,t){e.default={name:"ember-data",initialize:t.default}}),define("dummy/resolver",["exports","ember-resolver"],function(e,t){e.default=t.default}),define("dummy/router",["exports","ember","dummy/config/environment"],function(e,t,n){var a=t.default.Router.extend({location:n.default.locationType,rootURL:n.default.rootURL});a.map(function(){}),e.default=a}),define("dummy/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/services/jsonp",["exports","ember-jsonp/services/jsonp"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/application",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@2.7.3",loc:{source:null,start:{line:8,column:6},end:{line:21,column:6}},moduleName:"dummy/templates/application.hbs"},isEmpty:!1,arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("\n          ");e.appendChild(t,n);var n=e.createElement("div"),a=e.createTextNode("\n\n          ");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[1]),i=new Array(2);return i[0]=e.createAttrMorph(a,"title"),i[1]=e.createAttrMorph(a,"style"),i},statements:[["attribute","title",["concat",[["get","item.title",["loc",[null,[10,24],[10,34]]],0,0,0,0]],0,0,0,0,0],0,0,0,0],["attribute","style",["concat",["\n                          display: inline-block;\n                          background-image: url(",["get","item.media.m",["loc",[null,[13,50],[13,62]]],0,0,0,0],"), url(//www.gravatar.com/avatar/0cf15665a9146ba852bf042b0652780a?s=200);\n                          background-position: center;\n                          background-size: cover;\n                          width:150px;\n                          height: 150px;"],0,0,0,0,0],0,0,0,0]],locals:["item"],templates:[]}}(),t=function(){return{meta:{revision:"Ember@2.7.3",loc:{source:null,start:{line:21,column:6},end:{line:23,column:6}},moduleName:"dummy/templates/application.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("        ");e.appendChild(t,n);var n=e.createElement("p"),a=e.createTextNode("no search results");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{revision:"Ember@2.7.3",loc:{source:null,start:{line:1,column:0},end:{line:25,column:6}},moduleName:"dummy/templates/application.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("div");e.setAttribute(n,"style","margin: 0 auto;width: 1000px");var a=e.createTextNode("\n\n ");e.appendChild(n,a);var a=e.createElement("div");e.setAttribute(a,"style","margin-top: 20px; margin-bottom: 20px;");var i=e.createTextNode("\n   ");e.appendChild(a,i);var i=e.createComment("");e.appendChild(a,i);var i=e.createTextNode("\n ");e.appendChild(a,i),e.appendChild(n,a);var a=e.createTextNode("\n\n    ");e.appendChild(n,a);var a=e.createElement("div"),i=e.createTextNode("\n");e.appendChild(a,i);var i=e.createComment("");e.appendChild(a,i);var i=e.createTextNode("    ");e.appendChild(a,i),e.appendChild(n,a);var a=e.createTextNode("\n");return e.appendChild(n,a),e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[0]),i=new Array(2);return i[0]=e.createMorphAt(e.childAt(a,[1]),1,1),i[1]=e.createMorphAt(e.childAt(a,[3]),1,1),i},statements:[["inline","input",[],["value",["subexpr","@mut",[["get","searchTag",["loc",[null,[4,17],[4,26]]],0,0,0,0]],[],[],0,0],"placeholder","flickr search tag"],["loc",[null,[4,3],[4,60]]],0,0],["block","each",[["get","items",["loc",[null,[8,14],[8,19]]],0,0,0,0]],[],0,1,["loc",[null,[8,6],[23,15]]]]],locals:[],templates:[e,t]}}())}),define("dummy/config/environment",["ember"],function(e){try{var t=e.default.$('meta[name="dummy/config/environment"]').attr("content");return{default:JSON.parse(unescape(t))}}catch(e){throw new Error('Could not read config from meta tag with name "dummy/config/environment".')}}),runningTests||require("dummy/app").default.create({name:"ember-jsonp",version:"0.0.1+f743c199"});
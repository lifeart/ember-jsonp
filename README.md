# ember-jsonp

[Short description of the addon.]

This is service addon, named `jsonp`, providing `ember-ajax` -like UX with JSONP data without jQuery


## DEMO

 [https://lifeart.github.io/ember-jsonp/demo/](https://lifeart.github.io/ember-jsonp/demo/)


## Usage Example


```
  ember install ember-jsonp

```

```

   this.get('jsonp').request(URL,context,success,error,options);
   
   <<OR>>
   
   this.get('jsonp').request(URL,options).then(success).catch(error);
    
   <<OR>>

   this.get('jsonp').request({url,paramName}).then(success).catch(error);
   
   <<OR>>
   
    this.get('jsonp').request({
      url: "http://site.com?method=jsonp&callback={{callbackName}}",
      pattern: "{{callbackName}}"
    }).then(success).catch(error);
   
```


```
  jsonp: service(),
  init() {
    this.set('searchTag', 'emberconf');
  },
  items: computed(function () {
    return [];
  }),
  searchTag: '',
  getFlickerURI() {
    let encodedTag = encodeURIComponent(this.get('searchTag'));
    return `//api.flickr.com/services/feeds/photos_public.gne?tags=${encodedTag}&format=json`;
  },
  searchTagDidChange: on('init', observer('searchTag', function() {
    let url = this.getFlickerURI();
    this.get('jsonp').request(url,this,(result)=>{
      this.set('items',result.items);
    },(error)=>{
      console.log(error);
    },{
      paramName: 'jsoncallback'
    });

  }))

```

`ember-jsonp` generates random JSONP callback, with timeout and success/error handlers;


## Options 

* `paramName` callback parameter name
* `callbackName` callback name
* `timeout` timeout (ms)
* `uri` or `url` request URL
* `context` context for success/error handlers
* `success` success handler
* `error` error handler
* `pattern` callbackName pattern,

allows URL like  http://site.com/jsonp?callback={{callbackName}}

where `{{callbackName}}` -> pattern for replacing by service

## Installation

```
ember install my-addon
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd my-addon`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

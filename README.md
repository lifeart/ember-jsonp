# Ember-jsonp

This README outlines the details of collaborating on this Ember addon.

This is service addon, named `jsonp`, providing `ember-json` -like UX with JSONP data.


## DEMO

 [https://lifeart.github.io/ember-jsonp/demo/](https://lifeart.github.io/ember-jsonp/demo/)


## Usage Example


```
  ember install ember-jsonp

```



```

   this.get('jsonp').request(URL,context,success,error,options);

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
* `pattern` callbackName pattern,

allows URL like  http://site.com/jsonp?callback=%callbackName%

where `%callbackName%` -> pattern for replacing by service

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

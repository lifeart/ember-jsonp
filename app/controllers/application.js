import Ember from 'ember';

const {inject:{service},computed,observer,on} = Ember;

export default Ember.Controller.extend({
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
    this.get('jsonp').request({
      url,
      paramName:'jsoncallback'
    }).then((result)=>{
      this.set('items',result.items);
    }).catch((error)=>{
      console.log(error);
    });

  }))
});

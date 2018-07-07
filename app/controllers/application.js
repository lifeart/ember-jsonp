import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { observer, computed } from '@ember/object';
import { on } from '@ember/object/evented';

export default Controller.extend({
  jsonp: service(),
  init() {
    this.set('searchTag', 'emberconf');
  },
  items: computed(function () {
    return [];
  }),
  searchTag: '',
  getFlickerURI() {
    let encodedTag = encodeURIComponent(this.searchTag);
    return `//api.flickr.com/services/feeds/photos_public.gne?tags=${encodedTag}&format=json`;
  },
  searchTagDidChange: on('init', observer('searchTag', function() {
    let url = this.getFlickerURI();
    this.jsonp.request({
      url: url,
      paramName:'jsoncallback'
    }).then((result)=>{
      this.set('items',result.items);
    }).catch((error)=>{
      console.log(error);
    });

  }))
});

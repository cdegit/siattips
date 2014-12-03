App.Collections.Articles = Backbone.Collection.extend({
  model: App.Models.Article,
  url: '/articles',
});

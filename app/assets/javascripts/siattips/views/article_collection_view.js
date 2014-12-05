App.Views.ArticleCollectionView = Marionette.CollectionView.extend({
  className: 'row',
  childView: App.Views.ArticleListItemView,

  initialize: function(options) {
  	this.collection = App.router.collections.articles;
  	this.collection.fetch({async: false});
  }
});

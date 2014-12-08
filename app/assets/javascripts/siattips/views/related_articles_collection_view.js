App.Views.RelatedArticlesCollectionView = Marionette.CollectionView.extend({
  childView: App.Views.RelatedArticleListItemView,

  initialize: function(options) {
  	this.article = options.article;
  	this.category = options.category;
  	this.collection = new App.Collections.Articles( this.category.get("articles") );

  	this.collection.remove(this.article);
  },
});

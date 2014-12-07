App.Views.IndexView = Marionette.ItemView.extend({
  id: 'index-view',
  template: JST['siattips/templates/views/index_template'],

  ui: {
  	$featuredContainer: '.featured-container',
  	$collectionContainer: '.collection-container'
  },

  initialize: function(options) {
  	this.articlesCollectionView = new App.Views.ArticleCollectionView();

  	var featuredModel = new App.Models.Article({
  		id: 1
  	});
  	featuredModel.fetch({async: false});
  	this.featuredArticleView = new App.Views.FeaturedArticleView({
  		model: featuredModel
  	});

  },

  onRender: function() {
  	this.ui.$featuredContainer.append(this.featuredArticleView.render().$el);
  	this.ui.$collectionContainer.append(this.articlesCollectionView.render().$el);
  }
});

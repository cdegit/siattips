App.Views.IndexView = Marionette.CollectionView.extend({
  id: 'index-view',
  className: 'row',
  //template: JST['siattips/templates/views/index_template'],
  childView: App.Views.ArticleListItemView,

  initialize: function(options) {
  	this.collection = App.router.collections.articles;
  	this.collection.fetch({async: false});
  }
});

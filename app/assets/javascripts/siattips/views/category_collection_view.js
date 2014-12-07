App.Views.CategoryCollectionView = Marionette.CollectionView.extend({
  tagName: 'ol',
  id: "filters",
  childView: App.Views.CategoryListItemView,

  initialize: function(options) {
  	this.collection = App.router.collections.categories;
  	this.collection.fetch({async: false});
  }
});

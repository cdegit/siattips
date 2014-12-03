App.Views.ArticleDetailView = Marionette.ItemView.extend({
  id: 'detail-view',
  template: JST['siattips/templates/views/article_detail_template'],
  childView: App.Views.ArticleListItemView,

  initialize: function(options) {
  	console.log(options)
  	this.model = new App.Models.Article({
  		id: options.params.id
  	});
  	this.model.fetch({async: false});
  }
});

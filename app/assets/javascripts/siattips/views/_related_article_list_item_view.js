App.Views.RelatedArticleListItemView = Marionette.ItemView.extend({
  template: JST['siattips/templates/views/related_article_list_item_template'],
  className: "article",

  ui: {
  	$ratingsContainer: '.ranking'
  },

  onRender: function() {
  	this.ratingsView = new App.Views.RatingsView({
  		model: this.model
  	});

  	this.ui.$ratingsContainer.append(this.ratingsView.render().$el);
  }
});

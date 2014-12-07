App.Views.ArticleDetailView = Marionette.ItemView.extend({
  id: 'detail-view',
  template: JST['siattips/templates/views/article_detail_template'],
  childView: App.Views.ArticleListItemView,

  ui: {
    $ranking: '.ranking'
  },

  initialize: function(options) {
  	this.model = new App.Models.Article({
  		id: options.params.id
  	});
  	this.model.fetch({async: false});

    this.ratingsView = new App.Views.RatingsView({
      model: this.model
    });
  },

  onRender: function() {
    this.ui.$ranking.append(this.ratingsView.render().$el);
  }
});

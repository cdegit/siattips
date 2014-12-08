App.Views.ArticleDetailView = Marionette.ItemView.extend({
  id: 'detail-view',
  template: JST['siattips/templates/views/article_detail_template'],
  childView: App.Views.ArticleListItemView,

  ui: {
    $ranking: '.ranking',
    $otherPostsContainer: '.other-posts-content'
  },

  initialize: function(options) {
  	this.model = new App.Models.Article({
  		id: options.params.id
  	});
  	this.model.fetch({async: false});

    this.ratingsView = new App.Views.RatingsView({
      model: this.model
    });

    if (this.model.get("category")) {
      var category = new App.Models.Category({
        id: this.model.get("category").id
      });
      category.fetch({async: false});
      this.otherPostsCollectionView = new App.Views.RelatedArticlesCollectionView({
        article: this.model,
        category: category
      });
    }
  },

  onRender: function() {
    this.ui.$ranking.append(this.ratingsView.render().$el);

    if (this.otherPostsCollectionView) {
      this.ui.$otherPostsContainer.append(this.otherPostsCollectionView.render().$el);
    }

    if (this.model.get("category")) {
      this.$el.addClass( this.model.get("category").name.toLowerCase() );
      this.ui.$otherPostsContainer.addClass( this.model.get("category").name.toLowerCase() );
    }
  }
});

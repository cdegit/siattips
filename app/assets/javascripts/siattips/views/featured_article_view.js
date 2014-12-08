App.Views.FeaturedArticleView = Marionette.ItemView.extend({
  template: JST['siattips/templates/views/featured_article_template'],
  className: "article",

  onRender: function() {
    if (this.model.get("category")) {
      this.$el.addClass( this.model.get("category").name.toLowerCase() );
    }
  }
});

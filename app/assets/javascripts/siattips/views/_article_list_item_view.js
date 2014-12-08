App.Views.ArticleListItemView = Marionette.ItemView.extend({
  template: JST['siattips/templates/article_list_item_template'],
  className: "article",

  ui: {
  	$ratingsContainer: '.ranking'
  },

  onRender: function() {
  	this.ratingsView = new App.Views.RatingsView({
  		model: this.model
  	});

  	this.ui.$ratingsContainer.append(this.ratingsView.render().$el);

    if (this.model.get("category")) {
      this.$el.attr("data-filter-class", '["' + this.model.get("category").name + '"]' );
      this.$el.addClass( this.model.get("category").name.toLowerCase() );
    }

    $(".text", this.$el).html($.truncate(this.model.get("text"), {length: 350}));
  }
});

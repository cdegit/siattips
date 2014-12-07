App.Models.Article = Backbone.Model.extend({
  urlRoot: '/articles',

  addRating: function(rating) {
  	return $.post("/articles/" + this.get("id") + "/add_rating", {rating: rating});
  }
});

App.Models.Article = Backbone.Model.extend({
  urlRoot: '/api/articles',

  addRating: function(rating) {
  	return $.post("/api/articles/" + this.get("id") + "/add_rating", {rating: rating});
  }
});

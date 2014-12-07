App.Views.RatingsView = Marionette.ItemView.extend({
  className: 'ratings-view',
  template: JST['siattips/templates/views/ratings_template'],

  ui: {
    $star: 'span'
  },

  events: {
    'click @ui.$star': function(e) {
      var that = this;

      var articlesRated = this.getRatedArticles();

      if (this.checkIfRated() === undefined) {
        this.model.addRating( this.ui.$star.index(e.currentTarget) + 1 ).done(function() {
          that.model.fetch({async: false});
          that.render();

          articlesRated.push(that.model.get("id"));
          localStorage.setItem("articlesRated", JSON.stringify(articlesRated));

          that.$el.addClass("rated");
        });
      }
    }
  },

  initialize: function(options) {
    // will get passed an article model
    this.model = options.model;
  },

  onRender: function() {
    var that = this;
    
    if (this.checkIfRated() !== undefined) {
      this.$el.addClass("rated");
    }

    this.ui.$star.hover(
      function(e) {
        // when hovering, if not yet rated
        if (!that.rated) {
          $(e.currentTarget).removeClass("glyphicon-star-empty").addClass("glyphicon-star");
          $(e.currentTarget).prevAll().removeClass("glyphicon-star-empty").addClass("glyphicon-star");
          $(e.currentTarget).nextAll().removeClass("glyphicon-star").addClass("glyphicon-star-empty");
        }
      }, function(e) {
        if (!that.rated) {
          that.render();
        }
      });
  },

  getRatedArticles: function() {
    var articlesRated = JSON.parse(localStorage.getItem("articlesRated"));

    if (articlesRated == null) {
      articlesRated = [];
    }

    return articlesRated;
  },

  checkIfRated: function() {
    if (this.rated) return this.rated; // cache result

    var that = this;
    var articlesRated = this.getRatedArticles();
    
    this.rated = currentArticleRated = _.find(articlesRated, function(article) {
      return article === that.model.get("id")
    });

    return this.rated;
  }

});
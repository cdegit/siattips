App = new Backbone.Marionette.Application();
App.Collections = {};
App.Layouts = {};
App.Models = {};
App.Views = {};

App.addInitializer(function() {
  
  var router = Backbone.Router.extend({
    routes: {
      "articles/:id": "article_show",
      "about": "about_show",
      "*path": "index"
    },
   
    collections: {
      articles: new App.Collections.Articles(),
    },
   
    // from: http://stackoverflow.com/a/16191880/3670758
    current : function() {
      var Router = this,
          fragment = Backbone.history.fragment,
          routes = _.pairs(Router.routes),
          route = null, params = null, matched;

      matched = _.find(routes, function(handler) {
          route = _.isRegExp(handler[0]) ? handler[0] : Router._routeToRegExp(handler[0]);
          return route.test(fragment);
      });

      if(matched) {
          // NEW: Extracts the params using the internal
          // function _extractParameters 
          params = Router._extractParameters(route, fragment);
          paramKeys = this._extractParameters(route, matched[0]).map(function(key) {
            return key ? key.replace(':', '') : key;
          });
          paramsHash = _.omit(_.object(paramKeys, params), 'null');

          route = matched[1];
      }

      return {
          route : route,
          fragment : fragment,
          params : paramsHash
      };
    },

    evaluateRoute: function(route, data) {
        //regex taken from backbone
        return route.replace(/(\(\?)?:\w+/g, function(match, optional) {
            if (data instanceof Backbone.Model) {
                return data.get(match.replace(':', ''));
            }
            else {
                return data[match.replace(':', '')];
            }
        });
    },
  });

  App.router = new router();
  Backbone.history.start();
   
  var mainLayout = new App.Layouts.MainLayout();
  $("body").prepend(mainLayout.render().$el);
});

$(function() {
  App.start();
});


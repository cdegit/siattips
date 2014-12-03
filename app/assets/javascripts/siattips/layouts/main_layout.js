App.Layouts.MainLayout = Marionette.LayoutView.extend({
  tagName: 'div',
  id: 'main-layout',
  template: JST['siattips/templates/layouts/main_layout_template'],
  regions: {
    content: "#content"
  },
  
  viewClasses: {
    index: 'IndexView',
    article_show: 'ArticleDetailView'

  },

  onRender: function() {
    var that = this;
   
    this.showView(App.router.current().route, App.router.current().params);
    
    App.router.on('route', function(route, params) {
      that.showView(route, App.router.current().params);
    });
  },

  showView: function(route, params) {
    console.log("new view") 
    var viewName = this.viewClasses[route];
    var view = new App.Views[viewName]({
      params: params
    });

    this.content.show(view);
  }
});

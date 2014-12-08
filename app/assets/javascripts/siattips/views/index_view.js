App.Views.IndexView = Marionette.ItemView.extend({
  id: 'index-view',
  template: JST['siattips/templates/views/index_template'],

  ui: {
  	$featuredContainer: '.featured-container',
  	$collectionContainer: '.collection-container',
    $filtersContainer: '.filter-control',
    $searchForm: 'form',
    $clearButton: '.clear-search'
  },

  events: {
    'click @ui.$clearButton': function(e) {
      var that = this;
      
      $("input", this.$el).val("")

      this.searchArticles("");    
      return false;
    },
    'submit @ui.$searchForm': function() {
      this.searchArticles( $("input", this.$el).val() ); 
    }
  },

  initialize: function(options) {
  	this.articlesCollectionView = new App.Views.ArticleCollectionView();

  	var featuredModel = new App.Models.Article({
  		id: 1
  	});
  	featuredModel.fetch({async: false});
  	this.featuredArticleView = new App.Views.FeaturedArticleView({
  		model: featuredModel
  	});

    this.categoriesCollectionView = new App.Views.CategoryCollectionView();

  },

  onRender: function() {
    var that = this;

  	this.ui.$featuredContainer.append(this.featuredArticleView.render().$el);
  	this.ui.$collectionContainer.append(this.articlesCollectionView.render().$el);
    this.ui.$filtersContainer.prepend(this.categoriesCollectionView.render().$el);

    this.ui.$collectionContainer.imagesLoaded(function() {
      // Prepare layout options.
      that.wookmarkOptions = {
        itemWidth: 300, // Optional min width of a grid item
        autoResize: true, // This will auto-update the layout when the browser window is resized.
        container: $('.collection-container'), // Optional, used for some extra CSS styling
        offset: 20, // Optional, the distance between grid items
        outerOffset: 10, // Optional the distance from grid to parent
        flexibleWidth: '50%', // Optional, the maximum width of a grid item
        ignoreInactiveItems: false,
          comparator: function(a, b) {
            return $(a).hasClass('inactive') && !$(b).hasClass('inactive') ? 1 : -1;
          }
      };

      // Get a reference to your grid items.
      var handler = $('.collection-container .article');
      var filters = $('#filters li');

      // Flexible layout
      var $window = $(window);
      $window.resize(function() {
        var windowWidth = $window.width(),
            newOptions = { flexibleWidth: '50%' };

        // Breakpoint
        if (windowWidth < 1024) {
          newOptions.flexibleWidth = '100%';
        }

        handler.wookmark(newOptions);
      });

      // Filter event
      var onClickFilter = function(event) {
          var item = $(event.currentTarget),
              activeFilters = [];
          item.toggleClass('active');

          // Collect active filter strings
          filters.filter('.active').each(function() {
            activeFilters.push($(this).data('filter'));
          });

          handler.wookmarkInstance.filter(activeFilters, 'or');
        }

      // Call the layout function.
      handler.wookmark(that.wookmarkOptions);

      filters.click(onClickFilter);
    });
  },

  onClose: function() {
    this.categoriesCollectionView.close();
    this.featuredContainer.close();
    this.filtersContainer.close();
  },

  searchArticles: function(query) {
    var that = this;
    App.router.collections.articles.fetch({data: {q: query } }).done(function() {
      $('.collection-container .article').wookmark(that.wookmarkOptions);
      $(window).trigger("resize");
    });    
  }
});

App.Views.CategoryListItemView = Marionette.ItemView.extend({
  template: JST['siattips/templates/views/category_list_item_template'],
  tagName: 'li',
  className: function() {
  	return this.model.get("name").toLowerCase();
  },
  attributes: function() {
    return {
      "data-filter": this.model.get("name")
    };
  }
});

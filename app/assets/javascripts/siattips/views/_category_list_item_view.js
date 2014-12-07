App.Views.CategoryListItemView = Marionette.ItemView.extend({
  template: JST['siattips/templates/views/category_list_item_template'],
  tagName: 'li',
  attributes: function() {
    return {
      "data-filter": this.model.get("name")
    };
  }
});

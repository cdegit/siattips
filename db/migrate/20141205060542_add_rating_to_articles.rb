class AddRatingToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :rating, :int
  end
end

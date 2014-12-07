class AddRatingsCountToArticles < ActiveRecord::Migration
  def change
  	add_column :articles, :ratings_count, :int
  end
end

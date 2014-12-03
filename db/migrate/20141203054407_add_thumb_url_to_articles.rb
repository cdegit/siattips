class AddThumbUrlToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :thumb_url, :string
  end
end

class ArticlesController < ApplicationController

  def new

  end

  def index
    @articles = Article.all
    render json: @articles
  end

  def create
    @article = Article.new(permitted_params)
    @article.save
    render json: @article
  end

  def show
    @article = Article.find(params[:id])
    render json: @article
  end


private
  def permitted_params
    params.require(:article).permit(:title, :text, :link, :thumb_url, :category_id)
  end

end

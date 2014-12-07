class ArticlesController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:add_rating]
  http_basic_authenticate_with :name => ENV['username'], :password => ENV['password'], :only => [:new]

  def new

  end

  def index
    @articles = Article.all
    render json: @articles, :include => :category
  end

  def create
    @article = Article.new(permitted_params)
    @article.save
    render json: @article
  end

  def show
    @article = Article.find(params[:id])
    render json: @article, :include => :category
  end

  def add_rating
    @article = Article.find(params[:id])
    newRating = params[:rating].to_f
    newRating = [1, [newRating, 5].min].max

    if @article.ratings_count.nil?
        @article.ratings_count = 0
    end

    if @article.rating.nil?
      @article.rating = 0
    end

    @article.ratings_count += 1
    @article.rating = ( (@article.rating * (@article.ratings_count - 1)) + params[:rating].to_f) / @article.ratings_count

    @article.rating = [1, [@article.rating, 5].min].max
    
    @article.save
    render json: @article
  end


private
  def permitted_params
    params.require(:article).permit(:title, :text, :link, :thumb_url, :category_id)
  end

end

class ArticlesController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:add_rating]
  http_basic_authenticate_with :name => ENV['username'], :password => ENV['password'], :only => [:new]

  def new

  end

  def edit
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])
    @article.update_attributes(permitted_params)
    @article.save
    render json: @article, :include => :category
  end

  def index
    # @articles = Article.all
    # @q = Article.search(params[:q])
    @articles = Article.search(title_cont: params[:q]).result
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

  def featured_article
    @article = Article.offset(rand(Article.count)).first
    render json: @article, :include => :category
  end


private
  def permitted_params
    params.require(:article).permit(:title, :text, :link, :thumb_url, :category_id)
  end

end

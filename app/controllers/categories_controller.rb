class CategoriesController < ApplicationController
  http_basic_authenticate_with :name => ENV['username'], :password => ENV['password'], :only => [:new]

  def new

  end

  def index
    @categories = Category.all
    render json: @categories, :include => :articles
  end

  def create
    @category = Category.new(permitted_params)
    @category.save
    render json: @category
  end

  def show
    @category = Category.find(params[:id])
    render json: @category, :include => :articles
  end


private
  def permitted_params
    params.require(:category).permit(:name)
  end

end

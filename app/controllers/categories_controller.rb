class CategoriesController < ApplicationController

  def new

  end

  def index
    @categories = Category.all
    render json: @categories
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

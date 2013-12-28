require 'sinatra'
require 'pry'
require 'base64'
require 'open-uri'

get '/' do
  erb :index
end

get '/convert' do
  image_url = params[:image_url]
  # binding.pry
  image_file = open(image_url, "rb").read
  base64_image = Base64.encode64(image_file)
  return base64_image
  # render :text => base64_image
end
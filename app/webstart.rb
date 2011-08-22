require 'rubygems'
require 'sinatra'
require 'haml'

get '/' do
  @huddle = params[:huddle]
  haml :index
end


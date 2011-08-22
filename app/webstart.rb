require 'rubygems'
require 'sinatra'
require 'haml'

get '/' do
  @huddle = params[:huddle]
  @huddle ||= 'lunch_huddle'
  haml :index
end


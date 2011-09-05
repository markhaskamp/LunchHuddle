require 'rubygems'
require 'sinatra'
require 'haml'

get '/' do
  @huddle = params[:huddle]
  @huddle ||= 'lunch_huddle'

  @log_toggle = params[:log_toggle]
  @log_toggle ||= 'n'

  haml :index
end

get '/userinfo' do
  @huddle = params[:huddle]
  haml :userinfo
end

get '/utility' do
  @huddle = params[:huddle]
  @huddle ||= 'lunch_huddle'
  haml :utility
end


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


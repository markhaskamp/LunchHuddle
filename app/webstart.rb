require 'rubygems'
require 'sinatra'
require 'haml'
require 'action_mailer'

ActionMailer::Base.smtp_settings = {
  :address => "smtp.sendgrid.net",
  :port => '25',
  :domain => ENV['SENDGRID_DOMAIN'],
  :authentication => :plain,
  :user_name => ENV['SENDGRID_USERNAME'],
  :password => ENV['SENDGRID_PASSWORD']
}

class MyMailer < ActionMailer::Base
 def email to_addr
         mail(
          :to         => to_addr,
          :from       => "app760353@heroku.com",
          :subject    => "test email",
          :body       => "test email from lunchhuddle via heroke/sendgrid"
         )
  end
end

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

get '/huddle' do
  @huddle = params[:huddle]
  @huddle ||= 'lunch_huddle'
  haml :huddle
end

get '/utility' do
  @huddle = params[:huddle]
  @huddle ||= 'lunch_huddle'
  haml :utility
end

post '/huddle/invite' do
  to_addr = params[:txtEmailAddr]
  puts "---> to_addr: #{to_addr} <---"
  MyMailer.email(to_addr).deliver
end


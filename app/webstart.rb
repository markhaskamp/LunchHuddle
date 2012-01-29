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
  def email to_addr, huddle

    if (ENV['SENDGRID_DOMAIN'] == nil) 
      puts "===== SENDGRID_DOMAIN is nil."
      puts "===== to_addr: #{to_addr}\n"
    else

      mail(
        :to      => to_addr,
        :from    => "app760353@heroku.com",
        :subject => "LunchHuddle. Huddle Up!",
        :body    => "http://lunchhuddle.heroku.com/land?huddle=" + huddle
      )
    end
  end
end

get '/land' do
  @huddle = params[:huddle]

  haml :land
end

get '/' do
  @huddle = params[:huddle]
  redirect "/userinfo" if @huddle == nil

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

post '/huddle/invite' do
  huddle  = params[:txtHuddle]
  to_addr = params[:hdnEmailAddr]

  mailer = MyMailer.email(to_addr, huddle)
  mailer.deliver if ENV['SENDGRID_DOMAIN'] != nil

  redirect "/?huddle=#{huddle}"
end

get '/utility' do
  @huddle = params[:huddle]
  @huddle ||= 'lunch_huddle'
  haml :utility
end

get '/scratch' do
  haml :scratch
end


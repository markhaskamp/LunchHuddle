var cookie_user_id;
var huddle_name;
var vf_lunch_spots_view;
var saved_lunch_spots_view;
var vote_view;
var user_info_view;
var message_roll_view;

var message_svc = MessageFactory.create('pubnub');
// var message_svc = MessageFactory.create('mock');


$(document).ready(function() {
  vf_lunch_spots_view     = new VFLunchSpotsView({"el": $("#vf_lunch_spots_view") });
  saved_lunch_spots_view  = new SavedLunchSpotsView({"el": $("#saved_lunch_spots_view") });
  vote_view               = new VoteView( {"el": $("#vote_view") });
  user_info_view          = new UserInfoView({ "el": $('#user_info_view') });
  message_roll_view       = new MessageRollView({"el": $('#message_roll_view') });

  Logger.append('Modernizr.localstorage: [' + Modernizr.localstorage + ']');
  huddle_name = $('#huddle_name').text();

  $("form input").keypress(function (e) {
      if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
          $('.defaultButton').click();
          return false;
      } else {
          return true;
      }
  });

  $('#util_link').hover(
          function() { 
            var ele = $(this);

            ele.css('cursor', 'pointer');
            ele.addClass('white_text');
          },
          function() { 
            var ele = $(this);

            ele.css('cursor', 'default');
            ele.removeClass('white_text');
          }
  );

  $('#util_link').click(
    function() { window.location.replace('/utility?huddle=' + huddle_name ) }
  );

  vote_view.set_position();
  saved_lunch_spots_view.set_position();
  vf_lunch_spots_view.set_position();

  handle_user_enters_root_page(huddle_name);
});



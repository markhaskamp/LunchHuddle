var cookie_user_id;
var huddle_name;

var message_svc = MessageFactory.create('pubnub');
// var message_svc = MessageFactory.create('mock');


$(document).ready(function() {
  Logger.append('Modernizr.localstorage: [' + Modernizr.localstorage + ']');
  huddle_name = $('#huddle_name').text();

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


  try {
    handle_user_enters_root_page();
  }
  catch(exc) {
    Logger.error(exc);
  }
});



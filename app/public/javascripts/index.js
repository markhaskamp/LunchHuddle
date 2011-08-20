var cookie_user_id;
var huddle_name;

var message_svc = MessageFactory.create('mock');


$(document).ready(function() {
  huddle_name = $('#huddle_name').text();

  message_svc.subscribe_to_huddle(huddle_name);

  cookie_user_id = $.cookie('user_id');
  if (cookie_user_id.length > 0) {
    $('#txtName').val(cookie_user_id);
    $('#txtName').attr('disabled', 'disabled');
  }

  $('#btnVote').click(function() {
    i_vote();
  });

  $('.vote_for').live('click', function() {
    var ele = $(this);
    vote_up_this_item(ele);
  });
});



var cookie_user_id;
var huddle_name;

var message_svc = MessageFactory.create('pubnub');


$(document).ready(function() {
  huddle_name = $('#huddle_name').text();

  message_svc.subscribe_to_huddle(huddle_name);

  cookie_user_id = $.cookie('user_id');
  if (cookie_user_id.length > 0) {
    $('#txtName').val(cookie_user_id);
    $('#txtName').attr('disabled', 'disabled');
  }

  var saved_lunch_spots = DataStore.get_lunch_spots();
  SavedLunchSpotsView.display_lunch_spots(saved_lunch_spots);

  $('#btnVote').click(function() {
    DataStore.save_lunch_spot(VoteView.get_lunch_spot());
    i_vote();
  });

  $('.vote_for').live('click', function() {
    var ele = $(this);
    vote_up_this_item(ele);
  });

  $('.vote_for_saved').live('click', function() {
    var ele = $(this);
    vote_up_this_saved_lunch_spot(ele);
  });

  $('.delete_saved').click(function() {
    var ele = $(this);
    delete_saved_lunch_spot(ele);
  });
});



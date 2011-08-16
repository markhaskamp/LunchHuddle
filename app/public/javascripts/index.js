var cookie_user_id;
var huddle_name;

$(document).ready(function() {
  huddle_name = $('#huddle_name').text();

  subscribe_to_huddle(huddle_name);
  send_checkin_notice(huddle_name);

  cookie_user_id = $.cookie('user_id');
  if (cookie_user_id.length > 0) {
    $('#txtName').val(cookie_user_id);
    $('#txtName').attr('disabled', 'disabled');
  }

  $('#btnVote').click(function() {
    i_vote();
  });
});

function set_cookie_for(json_var) {
  $.cookie(json_var.key, json_var.val, {expires: 1});
}

function textbox_is_empty(selector) {
  var val = $(selector).val();
  if (val === "") {
    return(true);
  }

  var new_val = val.replace(/\s/g, "");
  if (new_val.length === 0) {
    return(true);
  }

  return(false);
}

function i_vote() {
  var user_id = $('#txtName').val();
    
  if (textbox_is_empty('#txtName')) {
    alert('who are you?');
  }
  else {
    $('#txtName').attr('disabled', 'disabled');
    set_cookie_for({key: 'user_id', val: user_id});
    // var foo = $.cookie('user_id'); // for debugging

    var existing_votes = restaurant_view.get_current_votes();
    existing_votes[user_id] = $('#txtVote').val();

    send_my_votes(huddle_name, existing_votes);
  }
}

function vote_handler(message_package) {
  // if (received_votes.checkin === undefined) {
  //   i_vote();
  // }
  // else {
  if (message_package.msg_type === 'votes') {
    var received_votes = message_package.votes;
    var existing_votes = restaurant_view.get_current_votes();
    var all_votes = merge_in_new_votes(existing_votes, received_votes);

    var html_val = restaurant_view.get_display(all_votes);
    $('#vote_list').html(html_val);
  }
  // }
}

function merge_in_new_votes(existing, new_votes) {

  $.each(new_votes, function(user_id) {
    existing[user_id] = new_votes[user_id];
  });

  return (existing);
}


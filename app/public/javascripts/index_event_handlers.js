function vote_up_this_item(ele) {
    var restaurant = ele.parent().find('#vote').text();
    $('#txtVote').val(restaurant);
    i_vote();
}

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

    var existing_votes = restaurant_view.get_current_votes();
    existing_votes[user_id] = $('#txtVote').val();

    message_svc.send_my_votes(huddle_name, existing_votes);
  }
}

function vote_handler(message_package) {
  // console.log('vote_handler');
  // console.log(message_package);

  // if (message_package.msg_type === 'checkin') {
  //   // console.log("msg_type = 'checkin vote'");
  //   i_vote();
  // }
  if (message_package.msg_type === 'votes') {
    // console.log('msg_type = "votes"');

    var received_votes = message_package.votes;
    var existing_votes = restaurant_view.get_current_votes();
    var all_votes = merge_in_new_votes(existing_votes, received_votes);

    var html_val = restaurant_view.get_display(cookie_user_id, all_votes);
    $('#vote_list').html(html_val);
  }
}

function merge_in_new_votes(existing, new_votes) {

  $.each(new_votes, function(user_id) {
    existing[user_id] = new_votes[user_id];
  });

  return (existing);
}


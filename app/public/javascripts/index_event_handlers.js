function vote_up_this_item(ele) {
    var restaurant = ele.prev().find('.vote').text();
    $('#txtLunchSpot').val(restaurant);
    i_vote();
}

function vote_up_this_saved_lunch_spot(ele) {
    var lunch_spot = ele.prev().text();
    $('#txtLunchSpot').val(lunch_spot);
    i_vote();
}

function delete_saved_lunch_spot(ele) {
    var lunch_spot = ele.prev().prev().text();
    DataStore.remove_lunch_spot(lunch_spot);

    var saved_lunch_spots = DataStore.get_lunch_spots();
    SavedLunchSpotsView.display_lunch_spots(saved_lunch_spots);
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

    var input_lunch_spot = VoteView.get_lunch_spot();
    voted_lunch_spot = LunchSpot.clean(input_lunch_spot);

    if (LunchSpot.is_valid(voted_lunch_spot)) {
      DataStore.save_lunch_spot(voted_lunch_spot);
      var current_vote = Object.beget(LunchSpot);
      current_vote.user_id = user_id;
      current_vote.lunch_spot = voted_lunch_spot;

      var existing_votes = RestaurantView.get_current_votes();
      RestaurantModel.add_vote(current_vote, existing_votes);

      message_svc.send_my_votes(huddle_name, existing_votes);
    }

  }
}

function vote_handler(message_package) {

  if (message_package.msg_type === 'votes') {

    var received_votes = message_package.votes;
    var existing_lunch_spots = RestaurantView.get_current_votes();
    // merge_in_new_votes(existing_lunch_spots, received_votes);
    var all_votes = merge_in_new_votes(existing_lunch_spots, received_votes);

    var html_val = RestaurantView.get_display(cookie_user_id, all_votes);
    $('#vote_list').html(html_val);
  }
}

function merge_in_new_votes(web_page_votes, passed_in_votes) {

  $.each(passed_in_votes, function(ndx, passed_in_vote) {
    RestaurantModel.add_vote(passed_in_vote, web_page_votes); 
  });

  return (web_page_votes);
}


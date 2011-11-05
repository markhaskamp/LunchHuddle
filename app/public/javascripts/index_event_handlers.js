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
    saved_lunch_spots_view.display_lunch_spots(saved_lunch_spots);
}

function set_cookie_for(json_var) {
  $.cookie(json_var.key, json_var.val, {expires: 1});
}

function i_vote() {
  Logger.append("i_vote. enter.");
  var user_json = UserInfo.pull_user_info_from_cookies();
  var user_id = user_json.user_id;
  var user_name = user_json.user_name;
    
  var input_lunch_spot = vote_view.get_lunch_spot();
  var voted_lunch_spot = LunchSpot.clean(input_lunch_spot);

  var user_msg = vote_view.get_message();
  user_msg = LunchSpot.clean(user_msg);

  if (LunchSpot.is_valid(voted_lunch_spot)) {
    DataStore.save_lunch_spot(voted_lunch_spot);
    var current_vote = Object.beget(LunchSpot);
    current_vote.user_id = user_id;
    current_vote.user_name = user_name;
    current_vote.lunch_spot = voted_lunch_spot;
    current_vote.user_msg = user_msg;

    var existing_votes = vf_lunch_spots_view.get_current_votes();
    RestaurantModel.add_vote(current_vote, existing_votes);

    message_svc.send_my_votes(huddle_name, existing_votes);
  }
}

function vote_handler(message_package) {
  Logger.append('vote_handler. enter. msg_type: [' + message_package.msg_type + ']');

  if (message_package.msg_type === 'votes') {

    var received_votes       = message_package.votes;
    var existing_lunch_spots = vf_lunch_spots_view.get_current_votes();
    var all_votes            = merge_in_new_votes(existing_lunch_spots, received_votes);

    var html_val = vf_lunch_spots_view.get_display(cookie_user_id, cookie_user_name, all_votes);
    $('#vote_list').html(html_val);

    // set_style_for_my_vote();
    $('.vote_item > .user_id').each(function(ndx) {
      var ele = $(this);
      if (ele.html() === cookie_user_id) {
        ele.parent().find('.vote').first().removeClass('vote_color');
        ele.parent().find('.vote').first().addClass('my_vote_color');

        ele.parent().find('.user_name').first().removeClass('vote_color');
        ele.parent().find('.user_name').first().addClass('my_vote_color');
      }
    });
  }

  if (message_package.msg_type === 'join_huddle') {
    i_vote();
  }

  if (message_package.msg_type === 'veto') {
    vetoed_lunch_spots_view.render(message_package.lunch_spot, 
                                   message_package.user_name, 
                                   message_package.user_id);
  }
}

function merge_in_new_votes(web_page_votes, passed_in_votes) {

  $.each(passed_in_votes, function(ndx, passed_in_vote) {
    RestaurantModel.add_vote(passed_in_vote, web_page_votes); 
  });

  return (web_page_votes);
}

function handle_user_enters_root_page(huddle_name) {
  // Logger.append('handle_user_enters_root_page. enter.');
  var users_cookie_info = UserInfo.pull_user_info_from_cookies();

  cookie_user_id = users_cookie_info.user_id;
  cookie_user_name = users_cookie_info.user_name;
  if (!Logger.log_is_on()) {
    LoggerView.hide();
  }

  // Logger.append('huddle_name: [' + huddle_name + ']');

  if (type(cookie_user_id) !== 'String') {
    var userinfo_loc = '/userinfo?huddle=' + huddle_name;
    // Logger.append('userinfo_loc: ' + userinfo_loc + ']');
    window.location = userinfo_loc;
  }

  huddle_name = $('#huddle_name').text();

  message_svc.subscribe_to_huddle(huddle_name);

  // Logger.append('cookie_user_id: [' + cookie_user_id + ']');
  // Logger.append('cookie_user_id.length: [' + cookie_user_id.length + ']');

  if (type(cookie_user_name) === 'String') {
    user_info_view.set_name_on_index(cookie_user_name);
  }

  var saved_lunch_spots = DataStore.get_lunch_spots();
  // Logger.append('index.js. saved_lunch_spots: [' + saved_lunch_spots + ']');
  saved_lunch_spots_view.display_lunch_spots(saved_lunch_spots);

  $('.vote_for').live('click', function() {
    var ele = $(this);
    vote_up_this_item(ele);

    DataStore.save_lunch_spot(vote_view.get_lunch_spot());
    var saved_lunch_spots = DataStore.get_lunch_spots();
    saved_lunch_spots_view.display_lunch_spots(saved_lunch_spots);
  });

  $('.delete_saved').live('click', function() {
    var ele = $(this);
    delete_saved_lunch_spot(ele);
  });

  message_svc.send_join_huddle_message(huddle_name);
}


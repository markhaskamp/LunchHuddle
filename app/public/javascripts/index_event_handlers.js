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

    var current_vote = Object.beget(Vote);
    current_vote.user_id = user_id;
    current_vote.vote = $('#txtVote').val();

    var existing_votes = RestaurantView.get_current_votes();
    RestaurantModel.add_vote(current_vote, existing_votes);

    message_svc.send_my_votes(huddle_name, existing_votes);
  }
}

function vote_handler(message_package) {

  if (message_package.msg_type === 'votes') {
    // console.log('msg_type = "votes"');

    var received_votes = message_package.votes;
    var existing_votes = RestaurantView.get_current_votes();
    var all_votes = merge_in_new_votes(existing_votes, received_votes);

    var html_val = RestaurantView.get_display(cookie_user_id, all_votes);
    $('#vote_list').html(html_val);
  }
}

// take the votes on my web page
// get the votes that were passed in to this function
// merge my web pages into passed in votes
function merge_in_new_votes(web_page_votes, passed_in_votes) {

  $.each(web_page_votes, function(ndx, web_page_vote) {
    RestaurantModel.add_vote(web_page_vote, passed_in_votes); 
  });

  return (passed_in_votes);
}


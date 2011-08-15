var cookie_user_id;

$(document).ready(function() {
  pubnub_subscribe();
  cookie_user_id = $.cookie('user_id');
  if (cookie_user_id.length > 0) {
    $('#txtName').val(cookie_user_id);
    $('#txtName').attr('disabled', 'disabled');
  }

  $('#btnVote').click(function() {
    var user_id = $('#txtName').val();
    
    if (textbox_is_empty('#txtName')) {
      alert('who are you?');
    }
    else {
      $.cookie('user_id', user_id, {expires: 1});
      var foo = $.cookie('user_id');

      var msg = {};
      msg.vote = $('#txtVote').val();
      msg.user_id = user_id;

      var current_votes = restaurant_view.get_current_votes();
      current_votes[msg.user_id] = msg.vote;
      msg.current_votes = current_votes;

      PUBNUB.publish({
        channel : "mrh_pubnub1",
        message : msg
      })
    }
  });
});

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


function vote_handler(msg) {
  var html_val = restaurant_view.get_display(msg);
  $('#vote_list').html(html_val);

  // $.getJSON("http://jsonip.appspot.com?callback=?",function(data){
	//   console.log( "Your ip: " + data.ip);
	// });
}


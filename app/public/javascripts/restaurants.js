var restaurant_model = {

};

var restaurant_view = {

// div#vote_list
//   div#vote_item
//     span#vote
//     span#user_id

  get_display: function(msg_json) {
    var return_html = '';
    // msg_json.current_votes.each(function(user, vote) {
    for (var user_id in msg_json.current_votes) {
          return_html += 
              '<div id="vote_item"><span id="vote">' + msg_json.current_votes[user_id] + '</span>' +
              ' (<span id="user_id">' + user_id + '</span>)' +
              '</div>';
    };

    return(return_html);
  },

  get_current_votes: function() {
    var current_votes = {};
    var vote_list = $('#vote_list #vote_item');

    vote_list.each(function() {
      var u = $(this).find('#user_id').first().html();
      var v = $(this).find('#vote').first().html();

      current_votes[u] = v
    });

    return (current_votes);
  }
};


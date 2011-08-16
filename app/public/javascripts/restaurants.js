var restaurant_model = {
}

var restaurant_view = {

// div#vote_list
//   div#vote_item
//     span#vote
//     span#user_id

  get_display: function(all_votes) {
    var return_html = '';

    $.each(all_votes, function(u,r) {
          return_html += 
              '<div id="vote_item"><span id="vote">' + r + '</span>' +
              ' (<span id="user_id">' + u + '</span>)' +
              ' <span class="vote_for cursor_hover">+1</span>' +
              '</div>';
    });

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


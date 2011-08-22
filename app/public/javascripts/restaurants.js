var RestaurantModel = {
  add_vote: function(user_vote, existing_votes) {
    var b = this.user_vote_exists(user_vote, existing_votes);
    if (this.user_vote_exists(user_vote, existing_votes)) {
      this.replace_user_vote(user_vote, existing_votes);

      return;
    }
    else {
      existing_votes.push(user_vote);
      return;
    }

    return(null);
  },

  user_vote_exists: function(v, vl) {
    var found_a_match = false;
    $.each(vl, function(ndx, o) {

      if(v.user_id === o.user_id) {
        found_a_match = true;
      }
    });

    return(found_a_match);
  },

  replace_user_vote:function(v, vl) {
    $.each(vl, function(ndx, o) {
      if(v.user_id === o.user_id) {
        o.lunch_spot = v.lunch_spot;
      }
    });
  }
}

var RestaurantView = {

// div#vote_list
//   div#vote_item
//     span#vote
//     span#user_id
//     div.vote_for


  get_display: function(my_user_id, all_votes) {
    var return_html = '';

    $.each(all_votes, function(ndx, vote) {
        var vote_item_style = 'vote_item';
        if (vote.user_id === my_user_id) {
          vote_item_style = 'my_vote_item';
        }
        return_html += 
            '<div id="vote_item" class="' + vote_item_style + '"><span id="vote">' + vote.lunch_spot + '</span>' +
            ' (<span id="user_id">' + vote.user_id + '</span>)';

        if ( vote.user_id !== my_user_id) {
          return_html += ' <span class="vote_for cursor_hover">+1</span>';
        }
        return_html += '</div>';
    });

    return(return_html);
  },

  get_current_votes: function() {
    var current_votes = [];
    var vote_list = $('#vote_list #vote_item');

    vote_list.each(function() {
      var v = Object.beget(LunchSpot);
      v.user_id = $(this).find('#user_id').first().html();
      v.lunch_spot = $(this).find('#vote').first().html();

      current_votes.push(v);
    });

    return (current_votes);
  }
};


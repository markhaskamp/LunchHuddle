var RestaurantModel = {
  add_vote: function(user_vote, existing_votes) {
    var b = this.user_vote_exists(user_vote, existing_votes);
    if (this.user_vote_exists(user_vote, existing_votes)) {
      return(this.replace_user_vote(user_vote, existing_votes));
    }
    else {
      return(existing_votes.push(user_vote));
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
        o.vote = v.vote;
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

    var counted_votes = this.count_votes_for(all_votes);
    var sorted_counted_votes = this.sort_counted_votes(counted_votes);

    $.each(sorted_counted_votes,function(re,vo) {
      var votes_sub_list = _.select(all_votes, function(key,val) { 
              vo[0] === key
      });

      $.each(votes_sub_list, function(u,r) {
          var vote_item_style = 'vote_item';
          if (u === my_user_id) {
            vote_item_style = 'my_vote_item';
          }
          return_html += 
              '<div id="vote_item" class="' + vote_item_style + '"><span id="vote">' + r + '</span>' +
              ' (<span id="user_id">' + u + '</span>)';

          if ( u !== my_user_id) {
            return_html += ' <span class="vote_for cursor_hover">+1</span>';
          }
          return_html += '</div>';
      });
    });


    return(return_html);
  },

  get_current_votes: function() {
    var current_votes = [];
    var vote_list = $('#vote_list #vote_item');

    vote_list.each(function() {
      var v = Object.beget(Vote);
      v.user_id = $(this).find('#user_id').first().html();
      v.vote = $(this).find('#vote').first().html();

      current_votes.push(v);
    });

    return (current_votes);
  }
};


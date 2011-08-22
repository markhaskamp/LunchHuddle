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

    // count votes
    var lunch_spot_counts = {};
    // init to 0
    $.each(all_votes, function(ndx, lunch_spot) {
      lunch_spot_counts[lunch_spot.lunch_spot] = 0;
    });

    // add up votes
    $.each(all_votes, function(ndx, lunch_spot) {
      lunch_spot_counts[lunch_spot.lunch_spot] += 1;
    });

    // sort lunch_spot hash by value(which = number of votes)?
    var lunch_spot_array = [];
    $.each(lunch_spot_counts, function(key) { 
      lunch_spot_array.push([key, lunch_spot_counts[key]]);
    });
  
    var sorted_array = lunch_spot_array.sort(function(a,b) { return(a[1] < b[1]); });

    // walk through sorted_array to get lunch_spot
    // _.select into all_votes to get votes that match the sorted_array current item
    $.each(sorted_array, function(ndx, sorted_lunch_spot) {
      var foo = _.select(all_votes, function(cur_lunch_spot) { return ( cur_lunch_spot.lunch_spot === sorted_lunch_spot[0]); });

    $.each(foo, function(ndx, vote) {
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


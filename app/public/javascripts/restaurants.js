var RestaurantModel = {
}

var RestaurantView = {

// div#vote_list
//   div#vote_item
//     span#vote
//     span#user_id
//     div.vote_for

  count_votes_for: function(voted_for_list) {
    return_list = {};
    $.each(voted_for_list, function(u,r) {
      return_list[r] = 0;
    });
    $.each(voted_for_list, function(u,r) {
      return_list[r] += 1;
    });

    return(return_list);
  },

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

  sort_counted_votes: function(counted_votes) {
    var sorted_array = [];
    for (var restaurant in counted_votes) {
      sorted_array.push([restaurant, counted_votes[restaurant]])
    }
    var foo = sorted_array.sort(function(a,b) {return a[1] < b[1]});
    return (foo);
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


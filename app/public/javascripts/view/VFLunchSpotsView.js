var VFLunchSpotsView = Backbone.View.extend({
  events: {
    "click #.veto_vote": "on_veto_vote"
  }

  , on_veto_vote: function(event_object) {
    var ele_parent = $(event_object.currentTarget).parent();
    var lunch_spot = Object.beget(LunchSpot);

    lunch_spot.lunch_spot         = $(ele_parent).find('.vote').html();
    lunch_spot.user_display_name  = user_info_view.get_name();
    lunch_spot.user_id            = $.cookie('user_id');

    vetoed_lunch_spots_view.on_veto_vote(lunch_spot);
  }

  ,get_display: function(my_user_id, my_user_name, all_votes) {
    var return_html = '';

    var counted_lunch_spots = this.count_lunch_spots(all_votes);
    var lunch_spot_array = this.convert_to_array(counted_lunch_spots);
  
    var sorted_array = lunch_spot_array.sort(function(a,b) { return(a[1] < b[1]); });

    var is_top_voted_lunch_spot = true;
    // walk through sorted_array to get lunch_spot
    // _.select into all_votes to get votes that match the sorted_array current item
    $.each(sorted_array, function(ndx, sorted_lunch_spot) {
      var list = _.select(all_votes, 
              function(cur_lunch_spot) { 
                      return ( cur_lunch_spot.lunch_spot === sorted_lunch_spot[0]); 
              });

      var count_of_top_voted = 0;
      $.each(list, function(ndx, vote) {
        count_of_top_voted += 1;
        var vote_style = 'vote';
        var user_name_style = 'user_name';
        return_html += 
            '<div id="vote_item_container">' +
              '<span class="vote_item">' +
              '  <span class="vote vote_color">' + vote.lunch_spot + '</span>' +
              '  <span class="user_name vote_color">' + vote.user_name + '</span>' +
              '  <span class="user_id">' + vote.user_id + '</span>' +
              '</span>';
          

        if ( vote.user_id !== my_user_id) {
          return_html += ' <span class="vote_for cursor_hover"><img src="../images/vote_yes.png" /></span>';
          return_html += ' <span class="veto_vote cursor_hover"><img src="../images/vote_no.png" /></span>';
        }
        return_html += '</div>';
        return_html += '<div class="user_msg">' + vote.user_msg + '</div>';

      });
      if (is_top_voted_lunch_spot && count_of_top_voted > 1) {
        // return_html += '<p />';
        return_html += '<hr width="80%" />';
      }
      is_top_voted_lunch_spot = false;
    });

    return(return_html);
  }

  , get_huddle: function() {
    return $('#huddle_name').html();
  }

  , convert_to_array: function(counted_lunch_spots) {
    // sort lunch_spot hash by value(which = number of votes)
    var lunch_spot_array = [];
    $.each(counted_lunch_spots, function(key) { 
      lunch_spot_array.push([key, counted_lunch_spots[key]]);
    });

    return(lunch_spot_array);
  }

  , count_lunch_spots: function(lunch_spot_list) {
    // count votes
    var lunch_spot_counts = {};
    // init to 0
    $.each(lunch_spot_list, function(ndx, lunch_spot) {
      lunch_spot_counts[lunch_spot.lunch_spot] = 0;
    });
    //
    // add up votes
    $.each(lunch_spot_list, function(ndx, lunch_spot) {
      lunch_spot_counts[lunch_spot.lunch_spot] += 1;
    });

    return(lunch_spot_counts);
  },

  get_current_votes: function() {
    var current_votes = [];
    var vote_list = $('#vote_list .vote_item');

    vote_list.each(function() {
      var v = Object.beget(LunchSpot);
      var ele = $(this);
      v.user_id    = ele.find('.user_id').first().html();
      v.user_name  = ele.find('.user_name').first().html();
      v.lunch_spot = ele.find('.vote').first().html();
      v.user_msg   = ele.parent().next().html();

      current_votes.push(v);
    });

    return (current_votes);
  }
});


var RestaurantModel = {
  add_vote: function(user_vote, existing_votes) {
    // var b = this.user_vote_exists(user_vote, existing_votes);
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
        o.user_msg   = v.user_msg;
      }
    });
  }
}



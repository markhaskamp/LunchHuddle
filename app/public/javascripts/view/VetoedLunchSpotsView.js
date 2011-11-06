var VetoedLunchSpotsView = Backbone.View.extend({

  view_template:
        '<div class="veto_item_container">' +
        '  <span class="vote_item">' +
        '    <span class="veto veto_color">{{lunch_spot}}</span>' +
        '    <span class="veto_user_name veto_color">{{user_name}}</span>' +
        '    <span class="veto_user_id">{{user_id}}</span>' +
        '  </span>' +
        '</div>'

  , events: {
  }

  , render: function(lunch_spot, user_name, user_id) {
    var rendered_html = Mustache.to_html(this.view_template, 
                                         { "lunch_spot": lunch_spot,
                                           "user_name":  user_name,
                                           "user_id":    user_id });

    $('#vetoed_lunch_spots_view #veto_list').html(rendered_html);
    this.display({ "display": true });
  }

  , on_veto_vote: function(lunch_spot, user_name, user_id) {
    message_svc.send_veto_message(lunch_spot, user_name, user_id);
  }

  , display: function(display_toggle) {
    if (display_toggle.display === true) {
      $('#vetoed_lunch_spots_view').parent().show(); 
    }
    else {
      $('#vetoed_lunch_spots_view').parent().hide(); 
    }
  }
  

});


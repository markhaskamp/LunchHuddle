var vetoed_lunch_spots_view_template = 
        '<div class="veto_item_container">' +
        '  <span class="vote_item">' +
        '    <span class="veto veto_color">{{lunch_spot}}</span>' +
        '    <span class="veto_user_name veto_color">{{user_name}}</span>' +
        '    <span class="veto_user_id">{{user_id}}</span>' +
        '  </span>' +
        '</div>';

var VetoedLunchSpotsView = Backbone.View.extend({

  view_template: vetoed_lunch_spots_view_template 
        // '<div class="veto_item_container">' +
        // '  <span class="vote_item">' +
        // '    <span class="veto veto_color">{{lunch_spot}}</span>' +
        // '    <span class="veto_user_name veto_color">{{user_name}}</span>' +
        // '    <span class="veto_user_id">{{user_id}}</span>' +
        // '  </span>' +
        // '</div>'

  , events: {
  }

  , render: function(lunch_spot_list) {

    var rendered_html = "";
    _.each(lunch_spot_list, function(lunch_spot) {
      var rendered_html_item = Mustache.to_html(vetoed_lunch_spots_view_template,
                                                { "lunch_spot": lunch_spot.lunch_spot,
                                                  "user_name":  lunch_spot.user_display_name,
                                                  "user_id":    lunch_spot.user_id });

      rendered_html += rendered_html_item;
    });

    $('#vetoed_lunch_spots_view #veto_list').html(rendered_html);
    this.display({ "display": true });
  }

  , on_veto_vote: function(lunch_spot) {
    var my_veto_list = this.get_my_veto_list();
    var merged_veto_list = this.merge_veto_into_veto_list(my_veto_list, lunch_spot);

    message_svc.send_veto_message(merged_veto_list);
  }

  , get_my_veto_list: function() {
    var current_veto_list = [];
    var vote_list = $('#veto_item_container .vote_item');

    vote_list.each(function() {
      var ele = $(this);
      var v = Object.beget(LunchSpot);
      v.user_id    = ele.find('.user_id').first().html();
      v.user_name  = ele.find('.user_name').first().html();
      v.lunch_spot = ele.find('.vote').first().html();
      v.user_msg   = ele.parent().next().html();

      current_veto_list.push(v);
    });

    return (current_veto_list);
  }

  , merge_veto_into_veto_list: function(veto_list, new_veto) {
    var is_dupe = false;
    _.each(veto_list, function(current_lunch_spot) {
      if (current_lunch_spot.user_id === new_veto.user_id &&
          current_lunch_spot.lunch_spot === new_veto.lunch_spot) {

        is_dupe = true;
        return (veto_list);
      }
    });

    veto_list.push(new_veto);
    return(veto_list);
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


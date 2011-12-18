
var SavedLunchSpotsView = Backbone.View.extend({
  events: {
    "click .vote_for_saved": "on_vote_for_saved"
  }

  , on_vote_for_saved: function() {
    // var ele = $(this);
    var ele = $(arguments[0].currentTarget);
    vote_up_this_saved_lunch_spot(ele);
  }

  ,get_lunch_spots: function() {
    var return_array = [];
    var saved_lunch_spots = $('#saved_lunch_spots .lunch_spot');

    $.each(saved_lunch_spots, function(ndx, spot) {
      return_array.push(spot);
    });
  },

  display_lunch_spots: function(lunch_spot_list) {
    try {

      if (lunch_spot_list === undefined) {
        return;
      }
      if (lunch_spot_list !== null) {
  
        // var html_val = $('#saved_lunch_spots').val();
        var html_val = '';
  
        $.each(lunch_spot_list.sort(function(a,b) { return(a > b); }), 
          function(ndx, spot) {
            var div_line = 
                '<div id="saved_list">' +
                  '<span class="lunch_spot">' + spot + '</span>' +
                  ' &nbsp; ' +
                  '<span class="vote_for_saved cursor_hover"><img src="../images/vote_yes.png" alt="I want to eat here"></img></span>' +
                  ' &nbsp; ' +
                  '<span class="delete_saved cursor_hover"><img src="../images/stop.png" /></span>' +
                '</div>';
            html_val += div_line
        });
  
        $('#saved_lunch_spots').html(html_val);
      }
    }
    catch(err) {
      Logger.error('SavedLunchSpots. display_lunch_spots(). Error. ' + err);
    }
  },

  set_position: function() {
    var left_coord = $.cookie('saved_lunch_spots_view_left');
    var top_coord = $.cookie('saved_lunch_spots_view_top');

    var $section = $('div#saved_lunch_spots_view').parent('div.section');
    $section.css('position', 'fixed');
    $section.offset({top: top_coord, left: left_coord});
  }

}
)


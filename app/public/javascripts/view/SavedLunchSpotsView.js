
var SavedLunchSpotsView = Backbone.View.extend({
  events: {
    "click .vote_for_saved": "on_vote_for_saved"
    ,"click .delete_saved": "on_delete_saved"
    ,"click .toggle_view": "on_toggle_view_click"
  }

  , on_vote_for_saved: function() {
    var ele = $(arguments[0].currentTarget);
    vote_up_this_saved_lunch_spot(ele);
  }

  , on_delete_saved: function(event_object) {
    var $ele = $(event_object.currentTarget);

    var lunch_spot = $ele.prev().prev().text();
    DataStore.remove_lunch_spot(LunchSpot.clean(lunch_spot));

    var saved_lunch_spots = DataStore.get_lunch_spots();
    saved_lunch_spots_view.display_lunch_spots(saved_lunch_spots);
  }

  , on_toggle_view_click: function() {

    $('.toggle_view').toggle();
    
    var $toggleDiv = $('#saved_lunch_spots_view #saved_lunch_spots');
    $toggleDiv.toggle();
    
    if ($toggleDiv.css('display') === 'none')
      $('#saved_lunch_spots_view .header').addClass('closed');
    else
      $('#saved_lunch_spots_view .header').removeClass('closed');
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
  
        var sorted_list = _.sortBy(lunch_spot_list, function(s) { return s.toLowerCase(); });
        $.each(sorted_list, 
          function(ndx, spot) {
            var div_line = 
                '<div id="saved_list">' +
                  '<span class="lunch_spot">' + unescape(spot) + '</span>' +
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


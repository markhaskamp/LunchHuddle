
var SavedLunchSpotsView = {
  get_lunch_spots: function() {
    var return_array = [];
    var saved_lunch_spots = $('#saved_lunch_spots .lunch_spot');

    $.each(saved_lunch_spots, function(ndx, spot) {
      return_array.push(spot);
    });
  },

  display_lunch_spots: function(lunch_spot_list) {

    if (lunch_spot_list !== null) {

      html_val = $('#saved_lunch_spots').val();

      $.each(lunch_spot_list, function(ndx, spot) {
        var div_line = '<div><span class="lunch_spot">' + spot + '</span> &nbsp; <span class="vote_for_saved cursor_hover">+1</span></div>';
        html_val += div_line
      });

      $('#saved_lunch_spots').html(html_val);
    }
  }
}



var DataStore = {

  save_lunch_spot: function(lunch_spot) {
    if (Modernizr.localstorage) {
      var saved_lunch_spots = [];
      var saved_lunch_spots_string = localStorage.getItem('lh_lunch_spots');
  
      if (saved_lunch_spots_string !== null) {
        var saved_lunch_spots_list = saved_lunch_spots_string.split(',');
        if (_.indexOf(saved_lunch_spots_list, lunch_spot) === -1) {
          saved_lunch_spots_list.push(lunch_spot);
          localStorage.setItem('lh_lunch_spots', saved_lunch_spots_list);
        }
      }
      else {
        saved_lunch_spots.push(lunch_spot);
        localStorage.setItem('lh_lunch_spots', saved_lunch_spots_list);
      }
    }
  },

  remove_lunch_spot: function(lunch_spot) {
    if (Modernizr.localstorage) {
      var saved_lunch_spots = [];
      var saved_lunch_spots_string = localStorage.getItem('lh_lunch_spots');
      var saved_lunch_spots_list = saved_lunch_spots_string.split(',');
      var new_list = _.reject(saved_lunch_spots_list, function(o) { return(o === lunch_spot); });
      localStorage.setItem('lh_lunch_spots', new_list);
    }
  },

  get_lunch_spots: function() {
    if (Modernizr.localstorage) {
      var lunch_spot_string = localStorage.getItem('lh_lunch_spots');
  
      if (lunch_spot_string !== null) {
        var lunch_spot_list = lunch_spot_string.split(',');
        return lunch_spot_list;
      }
      else {
        return([]);
      }
    }
  }

}


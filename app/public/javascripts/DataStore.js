
var DataStore = {

  save_lunch_spot: function(lunch_spot) {
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
      saved_lunch_spots.push(lunch_spot_);
      localStorage.setItem('lh_lunch_spots', saved_lunch_spots_list);
    }
  },

  get_lunch_spots: function() {
    var lunch_spot_string = localStorage.getItem('lh_lunch_spots');

    if (lunch_spot_string !== null) {
      var lunch_spot_list = lunch_spot_string.split(',');
      return lunch_spot_list;
    }
    else {
      return([]);
  }

}


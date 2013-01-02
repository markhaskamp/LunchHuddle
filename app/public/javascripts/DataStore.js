
var DataStore = {

  ping: function() {
    return('DataStore');
  }

  ,save_invitees_list: function(invitees_list) {
    if (Modernizr.localstorage) {
      localStorage.setItem('lh_invitees', invitees_list);
    }
  }

  ,get_invitees_list: function(invitees_list) {
    if (Modernizr.localstorage) {
      var invitees_list = localStorage.getItem('lh_invitees');
      if (invitees_list !== null) {
        return invitees_list.split(',');;
      }
    }
    return null;
  }

  ,save_lunch_spot: function(lunch_spot) {
    if (Modernizr.localstorage) {
      var saved_lunch_spots = [];
      var saved_lunch_spots_string = localStorage.getItem('lh_lunch_spots');
  
      if (saved_lunch_spots_string !== null) {
        var saved_lunch_spots_list = saved_lunch_spots_string.split(',');
        if (_.indexOf(saved_lunch_spots_list, unescape(lunch_spot)) === -1) {
          saved_lunch_spots_list.push(lunch_spot);
          localStorage.setItem('lh_lunch_spots', saved_lunch_spots_list);
        }
      }
      else {
        saved_lunch_spots.push(lunch_spot);
        localStorage.setItem('lh_lunch_spots', saved_lunch_spots);
      }
    }
  }

  ,remove_lunch_spot: function(lunch_spot) {
    if (Modernizr.localstorage) {
      var saved_lunch_spots = [];
      var saved_lunch_spots_string = localStorage.getItem('lh_lunch_spots');
      var saved_lunch_spots_list = saved_lunch_spots_string.split(',');
      var new_list = _.reject(saved_lunch_spots_list, function(o) { 
        return(o.replace(/[^A-Za-z]/g, '') === lunch_spot.replace(/[^A-Za-z]/g, '')); 
      });

      if (new_list.length === 0) {
        localStorage.removeItem('lh_lunch_spots');
      }
      else {
        localStorage.setItem('lh_lunch_spots', new_list);
      }
    }
  }

  ,get_lunch_spots: function() {
    try {
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
    catch(err) {
      throw 'DataStore.get_lunch_spots() - ' + err;
    }
  }
}


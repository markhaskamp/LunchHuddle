var UserView = {
}

var LunchSpot = {
  user_display_name: null,
  user_id: null,
  lunch_spot: null,

  clean: function(input_lunch_spot) {
    Logger.append('LunchSpot.clean. before: [' + input_lunch_spot + ']');
    str1 = input_lunch_spot.replace(/eval/gi, '');
    str2 = str1.replace(/script/gi, '');
    str3 = str2.replace(/java/gi, '');
    str4 = str3.replace(/[,\.'"\$#\{\};\(\)\$]/g, ' ');
    Logger.append('LunchSpot.clean. after: [' + str4 + ']');
    return(str4);
  },

  is_valid: function(s) {
    Logger.append('Vote.is_valid(). s.length: [' + s.length + ']');
    var b = false;
    if (s.length > 0) {
      b = true;
    }
    Logger.append('is_valid. return [' + b + ']');
    return(b);
  }
}

var VoteView = {
  get_lunch_spot: function() {
    var lunch_spot = $('#txtLunchSpot').val();
    Logger.append('VoteView. get_lunch_spot: [' + lunch_spot + ']');
    return(lunch_spot);
  }
}

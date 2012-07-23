var LunchSpot = {
  user_display_name: null,
  user_id: null,
  lunch_spot: null,

  clean: function(input_lunch_spot) {
    // Logger.append('LunchSpot.clean. before: [' + input_lunch_spot + ']');
    var str1 = input_lunch_spot.replace(/eval/gi, '');
    var str2 = str1.replace(/;/g, ' ');
    var str3 = str2.replace(/<\s*script/gi, '');
    var str4 = escape(str3);

    // Logger.append('LunchSpot.clean. after: [' + str5 + ']');
    return(str4);
  },

  is_valid: function(s) {
    // Logger.append('Vote.is_valid(). s.length: [' + s.length + ']');
    var b = false;
    
    var new_str = s.replace(/\s+/g, '');
    // Logger.append('s after replacing all whitespace: [' + s + ']');
    // Logger.append('new_str: [' + new_str + ']');
    if (new_str.length > 0) {
      b = true;
    }
    // Logger.append('is_valid. return [' + b + ']');
    return(b);
  }
}


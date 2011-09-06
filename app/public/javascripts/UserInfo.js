
$(document).ready( function() {
  // pull name and id from cookies
  var user_json = UserInfo.pull_user_info_from_cookies();
  if (type(user_json.user_name) === 'String') {
    UserInfoView.set_name(user_json.user_name);
  }

  if (type(user_json.user_id) === 'String') {
    UserInfoView.set_id(user_json.user_id);
  }

  $('#joinHuddle').click(
          function() {
            UserInfo.save_form_info();

            var huddle_param = '';
            var huddle_name = UserInfoView.get_huddle_name();
            huddle_name = $.trim(huddle_name);
            if (huddle_name.length >= 0) {
              huddle_param = '?huddle=' + huddle_name;
            }
            var url =  "/" + huddle_param;
            window.location = url;

          });

  $('.why_email').click(function() {
    alert("We use your email address as a way to uniquely identify users, which is handy in case more than one user has the same name*. The only place we store it is locally on your machine in a cookie. \n\n* Don't tell anyone but we don't even verify it.");
  });
});


var UserInfo = {
  pull_user_info_from_cookies: function() {
    var user_id = $.cookie('user_id');
    var user_name = $.cookie('user_name');

    return (
        { 'user_id': user_id
          ,'user_name': user_name
        });
  },

  user_is_logged_in: function() {
    if(UserInfoView.name_is_empty()) {
      return(false);
    }

    if(UserInfoView.email_addr_is_empty()) {
      return(false);
    }

    return(true);
  },

  save_form_info: function() {
    
    var tmp_user_name = UserInfoView.get_name();
    var tmp_user_id = UserInfoView.get_id();

    $.cookie('user_name', tmp_user_name, {expires: 1});
    $.cookie('user_id', tmp_user_id, {expires: 1});
  }
}

var UserInfoView = {

  get_name: function() {
    return($('#txtName').val());
  },

  set_name: function(s) {
    return($('#txtName').val(s));
  },

  set_name_on_index: function(s) {
    $('#txtName').text(s);
  },

  get_id: function() {
    return($('#txtEmailAddr').val());
  },

  set_id: function(s) {
    return($('#txtEmailAddr').val(s));
  },

  get_huddle_name: function() {
    return($('#txtHuddleName').val());
  },

  set_huddle_name: function(s) {
    return($('#txtHuddleName').val(s));
  },

  name_is_empty: function() {

    var val = $('#txtName').val();
    if (val === "") {
      return(true);
    }
  
    var new_val = val.replace(/\s/g, "");
    if (new_val.length === 0) {
      return(true);
    }
  
    return(false);
  },

  email_addr_is_empty: function() {

    var val = $('#txtEmailAddr').val();
    if (val === "") {
      return(true);
    }
  
    var new_val = val.replace(/\s/g, "");
    if (new_val.length === 0) {
      return(true);
    }
  
    return(false);
  }
}

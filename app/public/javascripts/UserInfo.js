
$(document).ready( function() {
  UserInfoView.disable_join_huddle_action();

  $('#txtName').blur( function() { UserInfo.enable_join_button(); });
  $('#txtEmailAddr').blur( function() { UserInfo.enable_join_button(); });
  $('#txtHuddleName').blur( function() { UserInfo.enable_join_button(); });


  // pull name and id from cookies
  var user_json = UserInfo.pull_user_info_from_cookies();
  if (type(user_json.user_name) === 'String') {
    UserInfoView.set_name(user_json.user_name);
  }

  if (type(user_json.user_id) === 'String') {
    UserInfoView.set_id(user_json.user_id);
  }

  UserInfo.enable_join_button();


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
  enable_join_button: function() {
    if (UserInfoView.name_is_empty()       ||
        UserInfoView.email_addr_is_empty() ||
        UserInfoView.huddle_is_empty()) {

      UserInfoView.disable_join_huddle_action();
    }
    else {
      UserInfoView.enable_join_huddle_action();
    }
  },

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

    $.cookie('user_name', tmp_user_name, {expires: 30});
    $.cookie('user_id', tmp_user_id, {expires: 30});
  }
}

var UserInfoView = {
  disable_join_huddle_action: function() {
    $('#joinHuddle').attr('disabled', 'disabled');
  },

  enable_join_huddle_action: function() {
    $('#joinHuddle').removeAttr('disabled');
  },

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
    return(this.form_field_is_empty('#txtName'));
  },

  email_addr_is_empty: function() {
    return(this.form_field_is_empty('#txtEmailAddr'));
  },

  huddle_is_empty: function() {
    return(this.form_field_is_empty('#txtHuddleName'));
  },

  form_field_is_empty: function(selector_string) {

    var form_val = $(selector_string).val();
    if (form_val === "") {
      return(true);
    }
  
    if (form_val === undefined) {
      return (false);
    }

    var new_form_val = form_val.replace(/\s/g, "");
    if (new_form_val.length === 0) {
      return(true);
    }
  
    return(false);
  }

}

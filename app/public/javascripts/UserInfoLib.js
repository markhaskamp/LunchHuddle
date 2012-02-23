
var UserInfo = {
  enable_join_button: function() {
    $('#txtUniqueId').val($('#txtName').val() + '.' + new Date().getTime());
    if (user_info_view.name_is_empty()       ||
        user_info_view.huddle_is_empty()) {

      user_info_view.disable_join_huddle_action();
    }
    else {
      user_info_view.enable_join_huddle_action();
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
    if(user_info_view.name_is_empty()) {
      return(false);
    }

    return(true);
  },

  save_form_info: function() {
    
    var tmp_user_name = user_info_view.get_name();
    var tmp_user_id = user_info_view.get_id();

    $.cookie('user_name', tmp_user_name, {expires: 30});
    $.cookie('user_id', tmp_user_id, {expires: 30});
  }
}


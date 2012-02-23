var user_info_view;
$(document).ready( function() {
  user_info_view = new UserInfoView({ "el": $('#user_info_view') });
  user_info_view.disable_join_huddle_action();

  $('#txtUniqueId').val($('#txtName').val() + '.' + new Date().getTime());


  // pull name and id from cookies
  var user_json = UserInfo.pull_user_info_from_cookies();
  if (type(user_json.user_name) === 'String') {
    user_info_view.set_name(user_json.user_name);
  }

  if (type(user_json.user_id) === 'String') {
    user_info_view.set_id(user_json.user_id);
  }

  UserInfo.enable_join_button();

});





$(document).ready(function() {

  $('#clear_local_storage').click( function() { localStorage.removeItem('lh_lunch_spots'); });

  var local_storage_str = "false";
  if (Modernizr.localstorage) {
    local_storage_str = "true";
  }
  $('#local_storage').html(local_storage_str);


  var users_cookie_info = UserInfo.pull_user_info_from_cookies();
  $('#user_id').html(users_cookie_info.user_id);
  $('#user_name').html(users_cookie_info.user_name);
});


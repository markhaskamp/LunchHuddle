$(document).ready(function() {
  var local_storage_str = "false";
  if (Modernizr.localstorage) {
    local_storage_str = "true";
  }
  $('#local_storage').html(local_storage_str);
});


var UserInfoView = {

  get_name: function() {
    return($('#txtName').val());
  },

  disable_user_name: function() {
    $('#txtName').attr('disabled', 'disabled');
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
  }
}

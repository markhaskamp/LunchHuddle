var UserInfoView = {

  get_name: function() {
    return($('#txtName').val());
  },

  disable_user_name: function() {
    $('#txtName').attr('disabled', 'disabled');
  }
}

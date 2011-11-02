var UserInfoView = Backbone.View.extend ({
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
)



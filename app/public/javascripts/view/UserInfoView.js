var UserInfoView = Backbone.View.extend ({

  initialize: function() {
    $('#txtUniqueId').hide();
    this.enable_join_button();
  }

  ,events: {
    "keyup #txtName"       : "enable_join_button"
    ,"keyup #txtHuddleName": "enable_join_button"
    ,"click #joinHuddle"   : "onClickJoinHuddle"
  }

  ,onClickJoinHuddle: function() {
    UserInfo.save_form_info();

    var huddle_param = '';
    var huddle_name = user_info_view.get_huddle_name();
    huddle_name = $.trim(huddle_name);
    if (huddle_name.length >= 0) {
      huddle_param = '?huddle=' + huddle_name;
    }
    var url =  "/" + huddle_param;
    window.location = url;
  }

  ,enable_join_button: function() {
    if (this.name_is_empty() || this.huddle_is_empty()) {
      this.disable_join_huddle_action();
    }
    else {
      this.enable_join_huddle_action();
    }
  }

  ,disable_join_huddle_action: function() {
    $('#joinHuddle').hide();
  }

  ,enable_join_huddle_action: function() {
    $('#joinHuddle').show();
  }

  ,get_name: function() {
    return($('#txtName').val());
  }

  ,set_name: function(s) {
    return($('#txtName').val(s));
  }

  ,set_name_on_index: function(s) {
    $('#txtName').text(s);
  }

  ,get_id: function() {
    return($('#txtUniqueId').val());
  }

  ,set_id: function(s) {
    return($('#txtUniqueId').val(s));
  }

  ,get_huddle_name: function() {
    return($('#txtHuddleName').val());
  }

  ,set_huddle_name: function(s) {
    return($('#txtHuddleName').val(s));
  }

  ,name_is_empty: function() {
    return(this.form_field_is_empty('#txtName'));
  }

  ,huddle_is_empty: function() {
    return(this.form_field_is_empty('#txtHuddleName'));
  }

  ,form_field_is_empty: function(selector_string) {

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
);



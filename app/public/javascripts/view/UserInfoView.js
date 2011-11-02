var UserInfoView = Backbone.View.extend ({

  events: {
    "click #why_email":  "onClickForWhyEmail"
    , "click #why_name":  "onClickForWhyName"
    , "click #joinHuddle": "onClickJoinHuddle"
  }

  , onClickForWhyEmail: function() {
    alert("We use your email address as a way to uniquely identify users, which is handy in case more than one huddler has the same name*. The only place we store it is locally on your machine in a cookie. \n\n* Don't tell anyone but we don't even verify it.");
  }

  , onClickForWhyName: function() {
    alert("This is your name that the other huddlers will see for you.");
  }

  , onClickJoinHuddle: function() {
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

  , disable_join_huddle_action: function() {
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



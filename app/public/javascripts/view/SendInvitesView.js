var SendInvitesView = Backbone.View.extend({

  events: {
    "click #btnInvite": "on_btnInvite_click"
  }

  , on_btnInvite_click: function() {
    var invitees = $('#txtEmailAddr').val();
    invitees = this.normalize_invitees(invitees);

    this.set_cookie_for_invitees(invitees);

    $('#frmSendInvite').submit();
  }

  , get_email_addr: function() {
    return($('#txtEmailAddr').val());
  }

  , set_cookie_for_invitees: function(invitees) {
    var huddle = $('#txtHuddle').val();
    var cookie_name = huddle + '_invitees';
    $.cookie(cookie_name, invitees, {expires: 30});
  }

  , normalize_invitees: function(invitee_string) {
    var str = $.trim(invitee_string);

    str.replace(/\s+/g, " ");  // convert all whitespace to a space
    str.replace(/\,/g, " ");   // convert every comma to a space
    str.replace(/\s+/g, ",");  // convert contiguous spaces to one comma

    return(str);
  }
});


var SendInvitesView = Backbone.View.extend({

  events: {
    "click #btnInvite": "on_btnInvite_click"
  }

  , on_btnInvite_click: function() {

    debugger;
    this.set_cookie_for_invitees();
    $('#frmSendInvite').submit();
  }

  , get_email_addr: function() {
    return($('#txtEmailAddr').val());
  }

  , set_cookie_for_invitees: function() {
    var huddle = $('#txtHuddle').val();
    var invitees = $('#txtEmailAddr').val();
    var cookie_name = huddle + '_invitees';
    $.cookie(cookie_name, invitees, {expires: 30});
  }

});


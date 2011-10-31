var SendInvitesView = Backbone.View.extend({

  events: {
    "click #btnInvite": "on_btnInvite_click"
  }

  , on_btnInvite_click: function() {

    // submit form to huddle/invite
    $('#frmSendInvite').submit();
  }

  , get_email_addr: function() {
    return($('#txtEmailAddr').val());
  }

});


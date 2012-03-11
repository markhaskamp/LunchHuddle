var add_form_view;
var send_invites_view

$(document).ready(function() {

  send_invites_view = new SendInvitesView({"el": $("#send_invites_view")});

  var invitees_email_list = DataStore.get_invitees_list();
  if (invitees_email_list !== null) {
    send_invites_view.display_invitee_list(invitees_email_list);
  }

  send_invites_view.enable_send_invite_button();

});

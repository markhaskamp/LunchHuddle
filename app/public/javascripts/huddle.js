var add_form_view;
var send_invites_view

$(document).ready(function() {

  send_invites_view = new SendInvitesView({"el": $("#send_invites_view")});

  // var cookie_name = $('#txtHuddle').val() + '_invitees';
  // var previous_invitees = $.cookie(cookie_name);

  // if (type(previous_invitees) === "String") {
  //   $('#txtEmailAddr').val(previous_invitees);
  // }

  var invitees_email_list = DataStore.get_invitees_list();
  if (invitees_email_list !== null) {
    send_invites_view.display_invitee_list(invitees_email_list);
  }

});

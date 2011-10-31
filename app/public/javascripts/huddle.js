var add_form_view;
var send_invites_view

$(document).ready(function() {

  send_invites_view = new SendInvitesView({"el": $("#send_invites_view")});

  var cookie_name = $('#txtHuddle').val() + '_invitees';
  var previous_invitees = $.cookie(cookie_name);

  $('#txtEmailAddr').val(previous_invitees);
});

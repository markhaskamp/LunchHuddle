var add_form_view;
var invitee_list_view

$(document).ready(function() {

  add_form_view = new AddInviteeView({"el": $("#frmAdd")});
  invitee_list_view = new InviteeListView({"el": $("#invitee_list")});

  _.extend(invitee_list_view, Backbone.Events);
  invitee_list_view.bind('add_invitee', invitee_list_view.on_add_invitee);  // move to view init?
});

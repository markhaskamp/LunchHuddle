var AddInviteeView = Backbone.View.extend({

  events: {
    "click #btnAdd": "on_btnAdd_click"
  }

  , on_btnAdd_click: function() {
    invitee_list_view.trigger('add_invitee', this.get_email_addr());
  }

  , get_email_addr: function() {
    return($('#txtEmailAddr').val());
  }

});


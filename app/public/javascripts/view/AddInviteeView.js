var AddInviteeView = Backbone.View.extend({

  events: {
    "click #btnAdd": "on_btnAdd_click"
  }

  , on_btnAdd_click: function() {
    invitee_list_view.trigger('add_invitee', this.get_name(),  this.get_email_addr());
  }

  , get_email_addr: function() {
    return($('#txtEmailAddr').val());
  }

  , get_name:function() {
    return($('#txtName').val());
  }

});


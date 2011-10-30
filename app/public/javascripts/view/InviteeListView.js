var InviteeListView = Backbone.View.extend({

  invitees: []

  , events: {
  }

  , render: function() {
    $('#invitee_list').html('');
    var html_str = '';

    _.each(this.invitees, function(invitee) {
      html_str += '<span class="invitee_item">' + invitee + '</span><br />';
    });
    $('#invitee_list').html(html_str);
  }

  , on_add_invitee: function(email_addr) {
    this.invitees.push(email_addr);

    this.render();
  }

});


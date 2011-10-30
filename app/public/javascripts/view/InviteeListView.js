var InviteeListView = Backbone.View.extend({

  invitees: []

  , events: {
  }

  , render: function() {
    $('#invitee_list').html('');
    var html_str = '';

    _.each(this.invitees, function(invitee) {
      html_str += 
            '<div class="invitee_item">' +
              '<span class="invitee_item_name">' + 'foo' + '</span>' + 
              '<span class="invitee_item_email">' + invitee + '</span>' +
            '</div>';
    });
    $('#invitee_list').html(html_str);
  }

  , on_add_invitee: function(email_addr) {
    this.invitees.push(email_addr);

    this.render();
  }

});


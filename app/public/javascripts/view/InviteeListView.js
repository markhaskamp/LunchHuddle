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
              '<span class="invitee_item_name">' + invitee.name + '</span>' + 
              '<span class="invitee_item_email">' + invitee.email_addr + '</span>' +
            '</div>';
    });
    $('#invitee_list').html(html_str);
  }

  , on_add_invitee: function(name, email_addr) {
    var new_invitee = Object.beget(Invitee);
    new_invitee.name = name;
    new_invitee.email_addr = email_addr;

    this.invitees.push(new_invitee);
    this.render();
  }

});


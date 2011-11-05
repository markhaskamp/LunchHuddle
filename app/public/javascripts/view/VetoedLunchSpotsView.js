var VetoedLunchSpotsView = Backbone.View.extend({

  events: {
  }

  , on_veto_vote: function(lunch_spot, user_name, user_id) {
    message_svc.send_veto_message(lunch_spot, user_name, user_id);
  }


});


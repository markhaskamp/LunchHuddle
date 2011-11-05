var VetoedLunchSpotsView = Backbone.View.extend({

  events: {
  }

  , on_veto_vote: function(huddle, target) {
    var lunch_spot = $(target).parent().find('.vote').html();
    message_svc.send_veto_message(huddle, lunch_spot);
  }


});


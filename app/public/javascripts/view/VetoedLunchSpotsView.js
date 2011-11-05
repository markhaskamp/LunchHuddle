var VetoedLunchSpotsView = Backbone.View.extend({

  events: {
  }

  , on_veto_vote: function(target) {
    var lunch_spot = $(target).parent().find('.vote').html();
    message_svc.send_veto_message(lunch_spot);
  }


});


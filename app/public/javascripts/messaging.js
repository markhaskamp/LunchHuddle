var MessageFactory = {
  create: function(svc_type) {
                  if (svc_type === 'mock') {
                    return (Object.beget(MockSvc));
                  }
                  else if(svc_type === 'pubnub') {
                    return (Object.beget(PubnubSvc));
                  }
          }
};

var MockSvc = {
  getName: function() {
    return('MockSvc');
  },

  send_my_votes: function(huddle_name, existing_votes) {
    var message_package = {};
    message_package.msg_type = 'votes';
    message_package.votes = existing_votes;

    vote_handler(message_package);
  },

  send_join_huddle_message: function(huddle_name) {},

  subscribe_to_huddle: function(huddle_name){
  }
}

var PubnubSvc = {
  getName: function() {
    return('PubnubSvc');
  },

  subscribe_to_huddle: function(huddle_name) {

    // LISTEN FOR MESSAGES
    PUBNUB.subscribe({
        channel  : huddle_name,        // CONNECT TO THIS CHANNEL.
        error    : function() {        // LOST CONNECTION (auto reconnects)
            alert("Connection Lost. Will auto-reconnect when Online.")
        },
        callback : function(message) { // RECEIVED A MESSAGE.
            vote_handler(message)
        },
        connect  : function() {}        // CONNECTION ESTABLISHED.
    })
  }

  , send_my_votes: function (huddle_name, existing_votes) {
    Logger.append('send_my_votes. enter.');
    var message_package = {};
    message_package.msg_type = 'votes';
    message_package.votes = existing_votes;

    PUBNUB.publish({
      channel : huddle_name,
      message : message_package
    })
  }

  , send_join_huddle_message: function(huddle_name) {
    Logger.append('send_join_huddle_message. enter.');

    var message_package = {};
    message_package.msg_type = 'join_huddle';
    PUBNUB.publish({
      channel : huddle_name,
      message : message_package
    })
  }

  , send_veto_message: function(lunch_spot_list) {
    Logger.append('send_veto_message. enter.');
    var message_package = {};
    message_package.msg_type   = 'veto';
    message_package.lunch_spot_list = lunch_spot_list;

    PUBNUB.publish({
            channel: vf_lunch_spots_view.get_huddle()
            , message: message_package
    })
  }

}



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

  subscribe_to_huddle: function(huddle_name){
  }
}

var PubnubSvc = {
  getName: function() {
    return('PubnubSvc');
  },

  send_my_votes: function (huddle_name, existing_votes) {
    var message_package = {};
    message_package.msg_type = 'votes';
    message_package.votes = existing_votes;

    PUBNUB.publish({
      channel : huddle_name,
      message : message_package
    })
  },
  subscribe_to_huddle: function(huddle_name){

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
}





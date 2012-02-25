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
    huddle_name = this.build_huddle_name(huddle_name); 
    PUBNUB.subscribe({
        channel  : huddle_name,        // CONNECT TO THIS CHANNEL.
        error    : function() {        // LOST CONNECTION (auto reconnects)
            alert("PUBNUB subscribe error. Connection Lost. Will auto-reconnect when Online.")
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

    huddle_name = this.build_huddle_name(huddle_name); 
    PUBNUB.publish({
      channel : huddle_name,
      message : message_package
    })
  }

  , send_join_huddle_message: function(huddle_name) {
    Logger.append('send_join_huddle_message. enter.');
    Logger.append('lowercase huddle_name: ' + huddle_name.toLowerCase());

    var message_package = {};
    message_package.msg_type = 'join_huddle';
    huddle_name = this.build_huddle_name(huddle_name); 
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

    huddle_name = this.build_huddle_name(vf_lunch_spots_view.get_huddle().toLowerCase()); 
    PUBNUB.publish({
            channel: huddle_name
            , message: message_package
    })
  }

  , build_huddle_name: function(huddle_name) {
    huddle_name.toLowerCase();

    var dt = new Date();
    var y  = dt.getFullYear();
    var m  = dt.getMonth();
    var dy = dt.getDate();
    huddle_name = huddle_name + '_' + y + m + dy;

    return huddle_name;
  }
}



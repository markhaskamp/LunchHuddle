
function subscribe_to_huddle(huddle_name){

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

function send_my_votes(huddle_name, existing_votes) {
    var message_package = {};
    message_package.msg_type = 'votes';
    message_package.votes = existing_votes;

    PUBNUB.publish({
      channel : huddle_name,
      message : message_package
    })
}

function send_checkin_notice(huddle_name) {
    var message_package = {};
    message_package.msg_type = 'checkin';

    PUBNUB.publish({
      channel : huddle_name,
      message : message_package
    })
}


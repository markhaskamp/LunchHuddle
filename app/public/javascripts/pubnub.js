
function pubnub_subscribe(huddle_name){

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

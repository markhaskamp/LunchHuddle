
function pubnub_subscribe(){

    // LISTEN FOR MESSAGES
    PUBNUB.subscribe({
        channel  : "mrh_lunchhuddle.0815.1",      // CONNECT TO THIS CHANNEL.
        error    : function() {        // LOST CONNECTION (auto reconnects)
            alert("Connection Lost. Will auto-reconnect when Online.")
        },
        callback : function(message) { // RECEIVED A MESSAGE.
            vote_handler(message)
        },
        connect  : function() {}        // CONNECTION ESTABLISHED.
    })
}

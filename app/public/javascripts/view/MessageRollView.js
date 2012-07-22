var MessageRollView = Backbone.View.extend({
  events: {
  }

  ,render: function(user_name, message) {
    var existing_html = $('#messages').html();

    var message_html = 
      '<div class="msg_line">' +
      '  <span class="msg_user_name">[' + user_name + ']</span>' + 
      '  <span class="msg_user_message">' + unescape(message) + '</span>' +
      '</div>\n';

      $('#messages').html(existing_html + message_html);
  }
});


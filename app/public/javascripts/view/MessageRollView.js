var MessageRollView = Backbone.View.extend({
  events: {
  }

  ,render: function(user_name, message) {
    var existing_html = $('#messages').html();

    
    var current_date = new Date();
    var hours = current_date.getHours();
    var minutes = current_date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes
    }

    var message_html = 
      '<div class="msg_line">' +
      '  <span class="msg_time">[' + hours + ":" + minutes + ']</span>' +
      '  <span class="msg_user_name">[' + user_name + ']</span>' + 
      '  <span class="msg_user_message">' + message + '</span>' +
      '</div>\n';

      $('#messages').html(existing_html + message_html);

      $('#messages').animate({scrollTop: 125}, 'slow');
  }
});


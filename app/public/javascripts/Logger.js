var Logger = {

  append: function(s) {
    if (this.log_is_on()) {
      var html_text = LoggerView.get_html();
      html_text += '<br>\n' + s;
      LoggerView.set_html(html_text);
    }
  },

  clear: function() {
    LoggerView.set_html(' ');
  },

  log_is_on: function() {
    return (LoggerView.log_toggle() === 'y');
  }

}

var LoggerView = {

  hide: function() {
    $('#log').hide();
  },

  get_html: function() {
    return($('#log_content').html());
  },

  set_html: function(s) {
    $('#log_content').html(s);
  },

  log_toggle: function() {
    return($('#log_toggle').html());
  }
}

var MessageRollView = Backbone.View.extend({
  events: {
  }

  , get_display: function(new_message) {
    var existing_html = this.get_current_content();
    var new_html = add_new_message(new_message, exsiting_html);
  }
});



var VoteView = Backbone.View.extend ({
  get_lunch_spot: function() {
    var lunch_spot = $('#txtLunchSpot').val();
    Logger.append('VoteView. get_lunch_spot: [' + lunch_spot + ']');
    return(lunch_spot);
  },

  get_message: function() {
    return ($('#txtMessage').val());
  }
}
)

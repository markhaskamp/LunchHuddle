var SendInvitesView = Backbone.View.extend({

  events: {
    "click #btnInvite": "on_btnInvite_click"
  }

  , initialize: function() {
    var cookie_name = $('#txtHuddle').val() + '_invitees';
  }

  ,display_invitee_list: function(invitees_email_string) {
    var invitees_email_list = invitees_email_string.split(',');
    var list_json = {};
    list_json.list = invitees_email_list;
    var checkbox_template = '{{#list}}<p><input type="checkbox" name="chkInvitee" value="{{.}}" checked="checked" />{{.}}</p>{{/list}}';
    $('#invitee_list').html(Mustache.to_html(checkbox_template, list_json));
  }

  ,on_btnInvite_click: function() {
    var invitees = $('#txtEmailAddr').val();
    invitees = this.normalize_invitees(invitees);
    var invitees_list = invitees.split(',');
    DataStore.save_invitees_list(invitees_list);

    this.set_cookie_for_invitees(invitees);

    $('#frmSendInvite').submit();
  }

  ,get_email_addr: function() {
    return($('#txtEmailAddr').val());
  }

  ,set_cookie_for_invitees: function(invitees) {
    var huddle = $('#txtHuddle').val();
    var cookie_name = huddle + '_invitees';
    $.cookie(cookie_name, invitees, {expires: 30});
  }

  ,normalize_invitees: function(invitee_string) {
    var str = $.trim(invitee_string);

    debugger;
    str = str.replace(/\,/g, " ");   // convert every comma to a space
    str = str.replace(/\;/g, " ");   // convert every semi-colon to a space
    str = str.replace(/\s+/g, " ");  // convert all whitespace to a space
    str = str.replace(/\s+/g, ",");  // convert contiguous spaces to one comma

    return(str);
  }
});


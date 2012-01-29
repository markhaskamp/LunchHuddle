var SendInvitesView = Backbone.View.extend({

  events: {
    "click #btnInvite": "on_btnInvite_click"
    ,"click .delete_email_addr": "delete_email_address"
  }

  , initialize: function() {
    var cookie_name = $('#txtHuddle').val() + '_invitees';
  }

  ,delete_email_address: function(e) {
    var deleted_addr = $(e.currentTarget).prev().text();
    var old_invitee_list = DataStore.get_invitees_list();
    var new_invitee_list = [];

    $.each(old_invitee_list, function(ndx, item) {
      if (item !== deleted_addr) {
        new_invitee_list.push(item);
      }
    });

    DataStore.save_invitees_list(new_invitee_list);

    $(e.currentTarget).parent().html('');
  }

  ,display_invitee_list: function(invitees_email_list) {
    if (invitees_email_list.length > 0) {
      var list_json = {};
      list_json.list = invitees_email_list;
      var checkbox_template = 
  '{{#list}}' +
    '<p>' +
      '<input type="checkbox" class="invitee_email" id="chkInvitee" name="chkInvitee" value="{{.}}" checked="checked" />' +
      '<span class="email_addr_text">{{.}}</span>' +
      '<span class="delete_email_addr cursor_hover">' +
        '<img src="../images/stop.png" />' +
      '</span>' +
    '</p>' + 
  '{{/list}}';
  
      $('#invitee_list').html(Mustache.to_html(checkbox_template, list_json));
    }
  }

  ,on_btnInvite_click: function() {
    var existing_invitees = this.get_checked_email_addrs();
    var new_invitees      = $('#txtEmailAddr').val();
    new_invitees          = this.normalize_invitees(new_invitees);
    var new_invitees_list = new_invitees.split(',');

    $.each(new_invitees_list, function(ndx, item) {
      existing_invitees.push(item);      
    });

    if(this.view_has_new_invitees()) {
      this.save_invitee_list(new_invitees_list);
    }

    $('#hdnEmailAddr').val(existing_invitees.join(','));
    $('#frmSendInvite').submit();
  }

  ,view_has_new_invitees: function() {
    var new_invitees = $('#txtEmailAddr').val();

    return (new_invitees.trim().length > 0);
  }

  ,save_invitee_list: function(new_invitee_list) {
    var existing_invitees = this.get_existing_invitees();
    var all_invitees = existing_invitees.concat(new_invitee_list);
    DataStore.save_invitees_list(all_invitees);
  }

  ,get_checked_email_addrs: function() {
    var return_list = [];
    $.each($('.invitee_email'), function(ndx, item) {
      if ($(item).is(':checked')) {
        return_list.push($(item).val());
      }
    });

    return return_list;
  }

  ,get_existing_invitees: function() {
    var return_list = [];
    $.each($('.invitee_email'), function(ndx, item) {
      return_list.push($(item).val());
    });

    return return_list;
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

    str = str.replace(/\,/g, " ");   // convert every comma to a space
    str = str.replace(/\;/g, " ");   // convert every semi-colon to a space
    str = str.replace(/\s+/g, " ");  // convert all whitespace to a space
    str = str.replace(/\s+/g, ",");  // convert contiguous spaces to one comma

    return(str);
  }
});


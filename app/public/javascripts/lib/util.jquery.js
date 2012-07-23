if (typeof Object.beget !== 'function') {
  Object.beget = function(o) {
    var F = function() {};
    F.prototype = o;
    return new F()
  };
}

function isEmpty(o) {
  var o = {};
  for(var p in o) {
    if (o[p] != o.constructor.prototype[p])
      return false;
  }
  return true;
}

function type(obj){
    return Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1]
}

function htmlEncode(value) {
  return $('<div/>').text(value).html();
}

function htmlDecode(value) {
  return $('<div/>').html(value).text();


  /*
   or perhaps
return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
   * */
}


$('.cursor_hover').live('mouseover', function() { $(this).css('cursor', 'pointer'); });
$('.cursor_hover').live('mouseout', function() { $(this).css('cursor', 'default'); });



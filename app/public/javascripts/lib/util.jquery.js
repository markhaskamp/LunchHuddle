if (typeof Object.beget !== 'function') {
  Object.beget = function(o) {
    var F = function() {};
    F.prototype = o;
    return new F()
  };
}

$('.cursor_hover').hover( function() { $(this).css('cursor', 'pointer'); },
                          function() { $(this).css('cursor', 'default'); });

  $('.cursor_hover').live('mouseover', function() { $(this).css('cursor', 'pointer'); });
  $('.cursor_hover').live('mouseout', function() { $(this).css('cursor', 'default'); });

function type(obj){
    return Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1]
}

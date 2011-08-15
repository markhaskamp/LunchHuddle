
$('.cursor_hover').hover( function() {
                       $(this).css('cursor', 'pointer');
                     },
                     function() {
                       $(this).css('cursor', 'default');
                     });

  $('.cursor_hover').live('mouseover', function() { $(this).css('cursor', 'pointer'); });
  $('.cursor_hover').live('mouseout', function() { $(this).css('cursor', 'default'); });


// $(function () {
//     setNavigation();
// });

function setNavigation() {
  var path = window.location.pathname;
  path = path.replace(/\/$/, '');
  path = decodeURIComponent(path);

  var matches = 0;
  $('.navbar .nav a').each(function () {
    var href = $(this).attr('href');
    if (path.indexOf(href) !== -1) {
      $(this).closest('li').addClass('active');
      matches++;
    }
  });

  if (matches === 0) {
    $('.navbar .nav li').first().addClass('active');
  }
}


(function($) {
  setNavigation();
  $('#carousel-homepage').carousel();
})(jQuery);

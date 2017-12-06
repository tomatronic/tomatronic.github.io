$(document).ready(function() {

//Mobile navigation
  $('.menu-toggle').click(function() {
      if ($('.navbar').hasClass('open-nav')) {
          $('.navbar').removeClass('open-nav');
      } else {
          $('.navbar').addClass('open-nav');
      }
  });

  	$('a[href^="#"]').on('click',function (e) {
  	    e.preventDefault();

  	    var target = this.hash;
  	    var $target = $(target);

  	    $('html, body').stop().animate({
  	        'scrollTop': $target.offset().top - 120
  	    }, 900, 'swing');
  	});


//function for arrow fade out
  $(window).scroll(function(){
      $(".scroll").css("opacity", 1 - $(window).scrollTop() / 250);
    //250 is fade pixels
    });


});

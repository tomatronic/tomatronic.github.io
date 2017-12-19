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
      $('body').css("opacity", 1 - $(window).scrollTop() / 250);
      $document.body.style.background = "linear-gradient(rgba(255, 255, 255, " + opac + "), rgba(255, 255, 255, " + opac + ")), url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/times-square-perspective.jpg) no-repeat";
    //250 is fade pixels
    });


});

//Code for custom email slideshow
"use strict";
var Core;
(function (Core) {
    var Slider = (function () {
        function Slider() {
            // Durations
            this.durations = {
                auto: 2000,
                slide: 300
            };
            // DOM
            this.dom = {
                wrapper: null,
                container: null,
                project: null,
                current: null,
                next: null
            };
            // Misc stuff
            this.length = 0;
            this.current = 0;
            this.next = 0;
            this.isAuto = true;
            this.working = false;
            this.dom.wrapper = $('.page-view');
            this.dom.project = this.dom.wrapper.find('.project');
            this.dom.arrow = this.dom.wrapper.find('.arrow');
            this.length = this.dom.project.length;
            this.init();
            this.events();
            this.auto = setInterval(this.updateNext.bind(this), this.durations.auto);
        }
        /**
         * Set initial z-indexes & get current project
         */
        Slider.prototype.init = function () {
            this.dom.project.css('z-index', 10);
            this.dom.current = $(this.dom.project[this.current]);
            this.dom.next = $(this.dom.project[this.current + 1]);
            this.dom.current.css('z-index', 30);
            this.dom.next.css('z-index', 20);
        };
        /**
         * Initialize events
         */
        Slider.prototype.events = function () {
            var self = this;
            this.dom.arrow.on('click', function () {
                if (self.working)
                    return;
                self.processBtn($(this));
            });
        };       
        /**
         * Update next global index
         */
        Slider.prototype.updateNext = function () {
            this.next = (this.current + 1) % this.length;
            this.process();
        };
        /**
         * Update next global index
         */
        Slider.prototype.updatePrevious = function () {
            this.next--;
            if (this.next < 0)
                this.next = this.length - 1;
            this.process();
        };
        /**
         * Process, calculate and switch beetween slides
         */
        Slider.prototype.process = function () {
            var self = this;
            this.working = true;
            this.dom.next = $(this.dom.project[this.next]);
            this.dom.current.css('z-index', 30);
            self.dom.next.css('z-index', 20);
            // Hide current
            this.dom.current.addClass('hide');
            setTimeout(function () {
                self.dom.current.css('z-index', 10);
                self.dom.next.css('z-index', 30);
                self.dom.current.removeClass('hide');
                self.dom.current = self.dom.next;
                self.current = self.next;
                self.working = false;
            }, this.durations.slide);
        };
        return Slider;
    }());
    Core.Slider = Slider;
})(Core || (Core = {}));
document.addEventListener('DOMContentLoaded', function () {
    var imgLoad0 = imagesLoaded( '.page-view', { background: true });
    imgLoad0.on( 'done', function( instance ) {
      new Core.Slider();
    });
});

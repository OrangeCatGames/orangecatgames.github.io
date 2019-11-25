/**
 * NIVO SLIDER LIKE EFFECT SLIDESHOW BY TAUFIK NURROHMAN
 * URL: https://plus.google.com/108949996304093815163/about
 * Based on this slideshow framework: http://hompimpaalaihumgambreng.blogspot.com/2012/09/simple-useful-jquery-slideshow.html
 */

(function($) {

// ==================================================================================
// Configuration here:
// ----------------------------------------------------------------------------------
    var config = {
        slices: 10, // number of slices
        speed: 600, // slideshow speed
        easing: null, // easing type
        interval: 3000 // slideshow interval
    };
// ==================================================================================

    // Some variables...
    var $slider = $('#slider'),
        $caption = $slider.find('figcaption'),
        $container = $slider.find('.container'),
        $nav = $('#slider-nav'),
        $slide = $container.children(),
        autoSlide = null,
        $first = $slide.first();

    // Auto append navigation item based on the slides length
    $slide.each(function(index) {
        var i = index + 1;
        $nav.append('<a href="#slide-'+i+'">'+i+'</a>');
        $(this).attr('id', 'slide-'+i);
    });

    // Set the slices size
    var slice_w = $slider.width() / config.slices,
        slice_h = $slider.height();

    // Build the slices
    for (var i = 0; i < config.slices; i++) {
        $('<div class="slice" />').css({
            'position':'absolute',
            'width':slice_w,
            'height':slice_h,
            'left':slice_w*i,
            'z-index':4,
            'background-color':'transparent',
            'background-repeat':'no-repeat',
            'background-position':'-' + slice_w*i + 'px 0'
        }).appendTo($slider);
    }

    // Catch the slices, and also set the different position between odd and even slices
    var $sliceOdd = $slider.find('.slice:odd').css('bottom',0),
        $sliceEven = $slider.find('.slice:even').css('top',0);

    // Click to switch!
    $nav.find('a').on("click", function() {

        $nav.find('.active').removeClass('active');
        $(this).addClass('active');

        var pos = $(this).index(),
            text = $slide.eq(pos).attr('alt'),
            bg = $slide.eq(pos).attr('src');

        $slide.hide().eq(pos).trigger("load").show();

        // Do the caption and slices animation here!
        $caption.stop().animate({bottom:'-100px'}, config.speed/2);

        $sliceOdd.each(function(i) {
            $(this).stop().delay(i*100).animate({bottom:'-'+slice_h+'px',opacity:0}, config.speed, config.easing, function() {
                $(this).css({
                    'background-image':'url('+bg+')',
                    'bottom':0,
                    'opacity':1
                });
            });
        });
        $sliceEven.each(function(i) {
            $(this).stop().delay(i*100).animate({top:'-'+slice_h+'px',opacity:0}, config.speed, config.easing, function() {
                $(this).css({
                    'background-image':'url('+bg+')',
                    'top':0,
                    'opacity':1
                });
            });
        }).promise().done(function() {
            $caption.html(text).stop().animate({bottom:'0'}, config.speed/2);
        });

        clearInterval(autoSlide);
        autoSlide = setInterval(slideShow, config.interval);

        return false;

    }).first().addClass('active');

    // Init slideshow
    $caption.html($slide.first().attr('alt')).stop().animate({bottom:'0'}, config.speed);

    // Navigation clicker
    function slideShow() {
        if ($nav.find('.active').next().length) {
            $nav.find('.active').next().trigger("click");
        } else {
            $nav.find('a').first().trigger("click");
        }
    }

    // Run the slideshow on page load...
		// **Edit: Run the slideshow on DOM Ready for the CSS Deck Playground only**
    $(function() {

        // remove the 'loading background-image' of '#slider'
        $slider.css('background-image','none');

        // Show the '.container', 'figcaption' and '#slide-nav' when the page has been loaded!
				// **Edit: Show the '.container', 'figcaption' and '#slide-nav' on DOM Ready for the CSS Deck Playground only**
        $container.show();
        $caption.show();
        $nav.css('opacity',1);

        // Another init slideshow
        $slider.find('.slice').css('background-image', 'url('+$first.attr("src")+')');

        // Then, start the interval...
        autoSlide = setInterval(slideShow, config.interval);

    });

})(jQuery);
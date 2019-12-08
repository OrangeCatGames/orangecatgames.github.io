'use strict';
$(document).ready(function () {

    setTimeout(function () {
        $('.loader_bg').fadeToggle();
        $(window).scrollTop(0);
        $('.left').removeClass('hideee');
        $('.ssa').addClass('mast__title');
        $('.sa').addClass('mast__text');
        $('.oop').css('opacity', '1');
    }, 1200);

    (function($) {
        var s,
            spanizeLetters = {
                settings: {
                    letters: $('.js-spanize')
                },
                init: function() {
                    s = this.settings;
                    this.bindEvents();
                },
                bindEvents: function(){
                    s.letters.html(function (i, el) {
                        //spanizeLetters.joinChars();
                        var spanizer = $.trim(el).split("");
                        return '<span>' + spanizer.join('</span><span>') + '</span>';
                    });
                }
            };
        spanizeLetters.init();
    })(jQuery);

    $('.btn').on('click', function () {
        var b = $(this).attr('data-target');
        $('.'+ b).addClass('active');
        $('.left').addClass('hidee');
        $('.close-ss').addClass('active');
        $('.bg_img').css('opacity', '.25');
    });

    $('.close-ss, .close-mob').on('click', function () {
        $('.subscribe_section, .right').removeClass('active');
        $('.left').removeClass('hidee');
        $('.bg_img').css('opacity', '1');
        $('.close-ss').removeClass('active');
    });


    // -----------------------------------------------------------------------------------------------------
    // Lightbox
    $('.lightbox-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-with-zoom',
        fixedContentPos: true,
        closeBtnInside: true,

        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function (openerElement) {
                // openerElement is the element on which popup was initialized, in this case its <a> tag
                // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        },
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        }
    });
});
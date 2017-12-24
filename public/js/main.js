/*
    NAME : MAIN JS FILE
    AUTHOR NAME : Infinyteam
    AUTHOR WEBSITE : www.infinyteam.com
    OUR PORTFOLIO : http://themeforest.net/user/infinyteam/portfolio?ref=infinyteam
*/
(function ($) {
    "use strict";
    $(document).on('ready', function () {
        // ------------------------------------------------------
        // Is to disable the preloader when the page finish load!
        // ------------------------------------------------------
        $(window).on('load', function () {
            setTimeout(function () {
                $("#loader").css("display", "none");
            }, 100);
        });
        // ------------------------------------------------------
        // Add parent class to navigation parents
        // ------------------------------------------------------
        $(".mainmenu .menu ul > li > ul").parent().addClass("parent");
        $(".mainmenu .menu ul > li.parent").on('mouseover', function () {
            $(this).children(".mainmenu .menu ul > li > ul:not(.megamenu)").slideDown(0);
        });
        $(".mainmenu .menu ul > li.parent").on('mouseleave', function () {
            $(this).children(".mainmenu .menu ul > li > ul:not(.megamenu)").slideUp(100);
        });
        // ------------------------------------------------------
        // Header Mobile Menu
        // ------------------------------------------------------
        const sliderBackdrop = $("#slider-backdrop");
        const slideMenu = $(".slide-menu");
        const slideMenuItems = $(".slide-menu li");
        const menuClose = $(".menu-close");
        const menuHamburger = $(".menu-tigger");
        function closeSlideMenu() {
            console.log('close slide menu');
            slideMenu.removeClass('open');
            sliderBackdrop.addClass('display-none');
        }
        function openSlideMenu() {
            console.log('open slide menu');
            slideMenu.addClass('open');
            sliderBackdrop.removeClass('display-none');
        }
        menuHamburger.on("click", openSlideMenu);
        slideMenuItems.on("click", closeSlideMenu);
        menuClose.on("click", closeSlideMenu);
        sliderBackdrop.on("click", closeSlideMenu);
        $('.slide-menu ul li.active').addClass('open').children('ul').show();
        $('.slide-menu ul li.has-sub > a').on('click', function () {
            $(this).removeAttr('href');
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp(200);
            } else {
                element.addClass('open');
                element.children('ul').slideDown(200);
                element.siblings('li').children('ul').slideUp(200);
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp(200);
            }
        });
        // ------------------------------------------------------
        // Header Search Toggle
        // ------------------------------------------------------
        $(".search-tigger,.search-close").on("click", function () {
            $(".search-modal").toggleClass("open");
        });
        // ------------------------------------------------------
        // Sticky Header
        // ------------------------------------------------------
        $(".mainmenu").stickMe();
        // ------------------------------------------------------
        // Post Share Toggle
        // ------------------------------------------------------
        $(".post").on("click", ".meta-share", function () {
            $(this).toggleClass("open");
        });
        // ------------------------------------------------------
        // Feautred Layout One Slider Activated
        // ------------------------------------------------------
        var featuredSlider = $(".featured-posts .slider");
        featuredSlider.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            smartSpeed: 500,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            nav: true,
            navContainer: '#featuredNav',
            navText: ['', ''],
            dots: true,
            margin: 0,
            responsiveClass: true
        });
        // ------------------------------------------------------
        // Trending Posts Slider Activated
        // ------------------------------------------------------
        var trendingSlider = $(".trending-posts .slider");
        trendingSlider.owlCarousel({
            items: 5,
            loop: true,
            autoplay: true,
            smartSpeed: 500,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            nav: true,
            navContainer: '#trendNav',
            navText: ['', ''],
            dots: false,
            margin: 2,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 3
                },
                768: {
                    items: 4
                },
                992: {
                    items: 5
                }
            }
        });
        // ------------------------------------------------------
        // Blog Layout Has Slider Activated
        // ------------------------------------------------------
        var layoutSlider = $(".has-slider .col");
        layoutSlider.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            smartSpeed: 500,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            nav: true,
            navContainer: '#slideNav',
            navText: ['', ''],
            dots: true,
            margin: 5,
            responsiveClass: true
        });
        // ------------------------------------------------------
        // Slider Posts Widget Activated
        // ------------------------------------------------------
        var postsSlider = $(".slider-posts");
        postsSlider.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            smartSpeed: 500,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            nav: true,
            navContainer: '#sliderNav',
            navText: ['', ''],
            dots: true,
            margin: 0,
            responsiveClass: true
        });
        // ------------------------------------------------------
        // Activate Justified Gallery and Colorbox Lightbox
        // ------------------------------------------------------
        $('.post-gallery').each(function (i, el) {
            $(el).justifiedGallery({
                rowHeight: 120,
                rel: 'gallery-' + i
            }).on('jg.complete', function () {
                $(this).find('a').colorbox({
                    maxWidth: '100%',
                    maxHeight: '100%',
                    opacity: 0.8,
                    transition: 'elastic',
                    current: ''
                });
            });
        });
        $('.th-caption').each(function (i, el) {
            $(this).find('a').colorbox({
                maxWidth: '100%',
                maxHeight: '100%',
                opacity: 0.8,
                transition: 'elastic',
                current: ''
            });
        });
        // ------------------------------------------------------
        // This is function to activate the Sticky Sidebar Plugin
        // ------------------------------------------------------
        jQuery("#sidebar").theiaStickySidebar({
            // Settings
            additionalMarginTop: 60
        });
        // ------------------------------------------------------
        // Activate Match Height Plugin
        // ------------------------------------------------------
        $(".blog-wrapper").each(function () {
            $(this).children(".col").matchHeight();
        });
        // ------------------------------------------------------
        // Lazy Load Activated
        // ------------------------------------------------------
        $("img.lazy").unveil(200, function () {
            $(this).on('load', function () {
                this.style.opacity = 1;
            });
        });
        // ------------------------------------------------------
        // Scroll To Top
        // ------------------------------------------------------
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $(".totop").fadeIn();
            } else {
                $(".totop").fadeOut();
            }
        });
        $(".totop").on('click', function () {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    });
})(jQuery);


function myAccFunc() {
    var x = document.getElementById("demoAcc");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// Click on the "Jeans" link on page load to open the accordion for demo purposes
// document.getElementById("myBtn").click();


// Script to open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$(function () {
    (function () {
        $('#res-men-btn').click(function () {

            var parent = $(this).parent('#res-men-btn');
            var lines = $(this).find('span');
            parent.toggleClass('men-close men-open');
            if (parent.hasClass('men-open')) {
                lines.addClass('active');
                parent.next('ul.list-inline').slideDown(400);
            } else {
                lines.removeClass('active');
                parent.next('ul.list-inline').slideUp(400);
            }
        });
    })();
});


function expand() {
    var parent = $(this).parent('#res-men-btn');
    var lines = $(this).find('span');
    console.log($(this));
    console.log(parent);
    console.log(lines);
    parent.toggleClass('men-close men-open');
    if (parent.hasClass('men-open')) {
        lines.addClass('active');
        parent.next('ul.list-inline').slideDown(400);
    } else {
        lines.removeClass('active');
        parent.next('ul.list-inline').slideUp(400);
    }
}


function expand() {
    console.log("i was clicked1 ");
    var parentDiv = parent.document.getElementById('res-men-btn');
    var lines = parentDiv.children.getElementsByTagName('span');
    parentDiv.toggleClass('men-close men-open');
    if (parentDiv.hasClass('men-open')) {
        lines.addClass('active');
        parentDiv.next('ul.list-inline').slideDown(400);
    } else {
        lines.removeClass('active');
        parentDiv.next('ul.list-inline').slideUp(400);
    }
};

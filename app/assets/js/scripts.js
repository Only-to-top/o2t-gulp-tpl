`use strict`;

jQuery(function ($) {


    // menu
    const menu = $('.header-menu');
    const hamburger = $('.hamburger');

    $(document).mouseup(function (e) {
        if (e.target.className === 'hamburger') {
            hamburger.addClass('is-active');
            menu.stop().slideDown();
        } else if (e.target.className === 'hamburger is-active') {
            hamburger.removeClass('is-active');
            menu.stop().slideUp();
        } else if ((menu.has(e.target).length === 0) && (hamburger.has(e.target).length === 0)) {
            if ($(window).width() < 768) {
                hamburger.removeClass('is-active');
                menu.stop().slideUp();
            }
        }
    });


    // popup
    $('[data-fancybox]').fancybox({
        animationEffect: 'fade',
        animationDuration: 555,
        btnTpl: {
            smallBtn: `<button data-fancybox-close class="fancybox-button fancybox-close-small" title="Закрыть">×</button>`,
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
                NEXT: "Далее",
                PREV: "Назад",
            },
        },
        afterShow: function (instance, current) {
            $('.fancybox-slide').css('overflow', 'auto');
        }
    });
    // popup gallery
    $('[data-fancybox="gallery"]').fancybox({
        loop: true,
        animationEffect: "fade",
        transitionEffect: "circular",
    });


    // hide block on click outside
    if ($(window).width() < 768) {
        $(document).mouseup(function (e) {
            let container = $(".search--show");
            if (container.has(e.target).length === 0) {
                container.fadeOut();
            };
        });
    };


    // Swiper slider
    if (document.querySelector(".swiper-container--1x")) {
        $(".swiper-container--1x").each(function (index) {
            $(this).addClass("sw-slider-" + index);
            $(this).parent().find(".swiper-button-prev").addClass("btn-prev-" + index);
            $(this).parent().find(".swiper-button-next").addClass("btn-next-" + index);
            // $(this).parent().find(".swiper-pagination").addClass("sw-pagi-" + index);

            new Swiper(".sw-slider-" + index, {
                // pagination: { el: ".sw-pagi-" + index, clickable: true },
                navigation: { nextEl: ".btn-next-" + index, prevEl: ".btn-prev-" + index, },
                autoplay: { delay: 6500, disableOnInteraction: false, },
                spaceBetween: 20, // расст-е м-у слайдами
                grabCursor: true, // рука
                loop: true,
                // centeredSlides: true,
                //effect: 'fade',
                //fadeEffect: {
                //    crossFade: true
                //},
                breakpoints: { // mobile first
                    0: { slidesPerView: 1 },
                    480: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    992: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 }
                },
                // on: {
                //     init: function () {
                //         console.log('swiper initialized');
                //     },
                // },
            });
        });

        // stop autoplay swiper on hover
        $(".swiper-container--1x").hover(function () {
            (this).swiper.autoplay.stop();
        }, function () { (this).swiper.autoplay.start(); });

    };// /swiper slider


    // scroll to top
    $("#element, #element2").on("click", "a", function (event) {
        event.preventDefault();
        let id = $(this).attr('href'), top = $(id).offset().top;
        $('body, html').animate({ scrollTop: top }, 1500);
    });


    $('input[type="tel"]').mask('+7 (000) 000-00-00',
        // { placeholder: "+7 (___) ___-__-__" }
    );


    // equal heights
    let maxHeightEl = 0;
    const itemNameEQH = $('el');
    const equalHeightFunction = () => {
        itemNameEQH.each(function () {
            if ($(this).height() > maxHeightEl) { maxHeightEl = $(this).height(); }
        });
        itemNameEQH.height(maxHeightEl);
    }
    equalHeightFunction();
    $(window).resize(equalHeightFunction());


    // tabs
    $('.tab').on('click', function () {
        let dataTarget = $(this).attr('data-target');

        $('.tab').removeClass('active');
        $(this).addClass('active');

        $('.tab-content').removeClass('active');
        $('.tab-content--' + dataTarget).addClass('active');
    });


    // scrolling function
    $(window).scroll(function () {

        const menuHeight = $('.contacts-line').outerHeight();
        const menu = $('.menu-header');

        window.addEventListener("orientationchange", function () {
            menu = $('.menu-header').outerHeight();
        }, false);

        if ($(window).scrollTop() > menuHeight) {
            menu.parent().height(menu.outerHeight());
            menu.addClass('fixed');
        } else {
            menu.removeClass('fixed');
            menu.parent().height('auto');
        }

    });


});


document.addEventListener('DOMContentLoaded', () => {

    if (document.querySelector(".form")) {

        // email ajax send forms
        const ajaxSend = async (url, formData) => {

            // ждём ответ, только тогда наш код пойдёт дальше
            let fetchResponse = await fetch(url, {
                method: 'POST',
                body: formData
            });

            // ждём окончания операции
            return await fetchResponse.text();
        }

        document.querySelectorAll('.form').forEach(el => {
            el.addEventListener('submit', function (e) {
                e.preventDefault();
                const formData = new FormData(this);

                ajaxSend('/mail.php', formData)
                    .then(function (fetchResponse) {
                        document.querySelector('.fancybox-close-small').click(); // close fancy popup
                        swal({
                            title: 'Спасибо!',
                            text: 'Данные отправлены.',
                            icon: 'success',
                            button: 'Ok'
                        });
                        console.log(fetchResponse);
                    }).catch(function (error) {
                        swal({
                            title: error,
                            icon: 'error',
                            button: 'Ok'
                        });
                    });

                // this.reset();
            });
        });

    }

});
`use strict`;

jQuery(function ($) {


    // menu
    const menu = $('.header-menu');
    const menuOpen = function () {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            menu.stop().slideUp();
        } else {
            $(this).addClass('is-active');
            menu.stop().slideDown();
        }
    };
    $('.hamburger').on('click', menuOpen);

    // close menu
    const closeMenuFunc = () => {
        if ($(window).width() < 992) {
            $(document).mouseup(function (e) { //Скрыть меню при клике вне его
                const hamburger = $('.hamburger');

                if ((menu.has(e.target).length === 0) && (hamburger.has(e.target).length === 0)) {
                    menu.stop().slideUp();

                    if (hamburger.hasClass('is-active')) {
                        hamburger.removeClass('is-active');
                    };
                };
            });
        };
    };
    closeMenuFunc();
    $(window).resize(closeMenuFunc);


    // anchor link => title popup
    $('a[data-src="#main-form"]').click(function () {
        $("#main-form .title").html($(this).text()); //текст ссылки вставляем в название модального окна
    });


    // popup
    $('[data-fancybox]').fancybox({
        animationEffect: 'fade',
        animationDuration: 555,
        // smallBtn: false,
        btnTpl: {
            smallBtn:
                `<button data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">×</button>`,
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


    // Checked input type checkbox ?
    $('.mycheckbox').on('click', 'input', function () {
        if ($(this).is(':checked')) {
            $('.register-btn').prop('disabled', false);
            $(this).parent().removeClass('error');
        } else {
            $('.register-btn').prop('disabled', true);
            $(this).parent().addClass('error');
        }
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
            $(this).find(".swiper-button-prev").addClass("btn-prev-" + index);
            $(this).find(".swiper-button-next").addClass("btn-next-" + index);
            $(this).find(".swiper-pagination").addClass("sw-pagi-" + index);

            new Swiper(".sw-slider-" + index, {
                pagination: { el: ".sw-pagi-" + index, clickable: true },
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
                breakpoints: {
                    0: {                    // >= 0
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    480: {                  // >= 480px
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    768: {                  // >= 768px
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    992: {                  // >= 992px
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    1200: {                 // >= 1200px
                        slidesPerView: 4,
                        spaceBetween: 40
                    }
                },
                on: {
                    init: function () {
                        console.log('swiper initialized');
                    },
                },
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

    const ajaxSend = (formData, titleForm, textForm) => {
        fetch('/mail.php', {
            method: 'POST',
            body: formData
        }).then(function (response) {
            $('.fancybox-close-small').click(); // close fancy popup
            swal({ title: titleForm, text: textForm, type: 'success' });
        }).catch(function (error) {
            console.error(error);
        })
    }

    if (document.querySelector(".form")) {
        document.querySelectorAll('.form').forEach(el => {
            el.addEventListener('submit', function (e) {
                e.preventDefault();
                const formData = new FormData(this);
                ajaxSend(formData, 'Спасибо!', 'Данные отправлены.');
                this.reset(); // очищаем поля формы
            });
        });
    }

});

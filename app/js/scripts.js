`use strict`


document.addEventListener('DOMContentLoaded', function () {


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
    };

    document.querySelector('.subscribe-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        ajaxSend(formData, 'Спасибо!', 'Вы успешно подписались на нашу рассылку');
        this.reset(); // очищаем поля формы
    });

    document.querySelector('#contacts-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        ajaxSend(formData, 'Спасибо!', 'Менеджер свяжется с Вами в ближайшее время');
        this.reset(); // очищаем поля формы
    });

    document.querySelector('#popupForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        ajaxSend(formData, 'Спасибо!', 'Менеджер свяжется с Вами в ближайшее время');
        this.reset(); // очищаем поля формы
    });


});



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
    if ($(window).width() < 768) {
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


    // anchor link => title popup
    $('a[data-src="#main-form"]').click(function () {
        $("#main-form .title").html($(this).text()); //текст ссылки вставляем в название модального окна
    });


    // popup
    $('[data-fancybox]').fancybox({
        animationEffect: 'fade',
        animationDuration: 555,
        // smallBtn: false,
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
                NEXT: "Далее",
                PREV: "Назад",
            },
        },
    });
    // popup gallery
    $('[data-fancybox="gallery"]').fancybox({
        loop: true,
        animationEffect: "fade",
        transitionEffect: "circular",
    });


    // Checked input type checkbox ?
    $('.btn-send-form').on('click', function () {
        if ($('form input[type=checkbox]').is(':checked')) {
            $('form .checkbox-new').removeClass('red');
        } else {
            $('form .checkbox-new').addClass('red');
        }
    });


    // anchor link => title popup
    $('a[data-src="#popupForm"]').click(function () {
        $("#popupForm .title").html($(this).text()); //текст ссылки вставляем в название модального окна
    });


    // hide block on click outside
    if ($(window).width() < 768) {
        $(document).mouseup(function (e) {
            var container = $(".search--show");
            if (container.has(e.target).length === 0) {
                container.fadeOut();
            };
        });
    };


    // swiper slider
    new Swiper('.header-swiper-container', {
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', },
        // pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true, },
        autoplay: { delay: 6500, disableOnInteraction: false, },
        spaceBetween: 20, // расст-е м-у слайдами
        grabCursor: true, // рука
        loop: true,
        slidesPerView: 3, // кол-во слайдов
        breakpoints: {
            1200: { // < 1200
                slidesPerView: 2,
            },
            992: { // < 992
                slidesPerView: 2,
            },
            768: { // < 768
                slidesPerView: 1,
            },
            576: { // < 576
                slidesPerView: 1.5,
                spaceBetween: 15,
            },
        }
    });
    // stop autoplay swiper on hover
    $(".header-swiper-container").hover(function () {
        (this).swiper.autoplay.stop();
    }, function () {
        (this).swiper.autoplay.start();
    });


    // scroll to top
    $("#element, #element2").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'), top = $(id).offset().top;
        $('body, html').animate({ scrollTop: top }, 1500);
    });


    $('input[type="tel"]').mask('+7 (000) 000-00-00', { placeholder: "+7 (___) ___-__-__" });


    // equal heights
    const maxHeightEl = 0;
    $("itemName").each(function () {
        if ($(this).height() > maxHeightEl) { maxHeightEl = $(this).height(); }
    });
    $("itemName").height(maxHeightEl);



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

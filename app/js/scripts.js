`use strict`

jQuery(function($) {


    // menu
    const menu = $('.header-menu');
    const menuOpen = function() {
        if ( $(this).hasClass('is-active') ) {
            $(this).removeClass('is-active');
            menu.stop().slideUp();
        } else {
            $(this).addClass('is-active');
            menu.stop().slideDown();
        }
    };
    $('.hamburger').on('click', menuOpen);

    // close menu
    if ( $(window).width() < 768 ) {
        $(document).mouseup(function (e) { //Скрыть меню при клике вне его
            const hamburger = $('.hamburger');

            if ( (menu.has(e.target).length === 0) && (hamburger.has(e.target).length === 0) ) {
                menu.stop().slideUp();

                if ( hamburger.hasClass('is-active') ) {
                    hamburger.removeClass('is-active');
                };
            };
        });
    };



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


    //E-mail Ajax Send
    const ajaxSend = function(e) {
        e.preventDefault();
        const th = $(this);
        $.ajax({
            type: "POST",
            url: "./mail.php",
            data: th.serialize()
        }).done(function() {
            $('.fancybox-close-small').click(); // close fancy popup
            swal({ title: 'Сообщение отправлено', type: 'success' });
            setTimeout(function() { // Done Functions
                th.trigger("reset");
            }, 1000);
        });
    };
    $('.form').on('submit', ajaxSend);


    // Checked input type checkbox ?
    $('.btn-send-form').on('click', function(){
        if ( $('form input[type=checkbox]').is(':checked') ) {
            $('form .checkbox-new').removeClass('red');
        } else {
            $('form .checkbox-new').addClass('red');
        }
    });


    // Заголовок всплывающего окна = тексту кнопки
    $('a[data-src="#popupForm"]').click(function(){
        $("#popupForm .title").html( $(this).text() ); //текст ссылки вставляем в название модального окна
    });


    //Скрыть блок при клике вне его
    if ( $(window).width() < 768 ) {
        $(document).mouseup(function (e) {
            var container = $(".search--show");
            if (container.has(e.target).length === 0){
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
        // effect: 'fade', // для slidesPerView: 1
        // centeredSlides: true, //центрировать
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
    $(".header-swiper-container").hover(function() {
        (this).swiper.autoplay.stop();
    }, function() {
        (this).swiper.autoplay.start();
    });


    // scroll to top
    $("#element, #element2").on("click", "a", function (event) {
      event.preventDefault();
      var id = $(this).attr('href'), top = $(id).offset().top;
      $('body, html').animate({scrollTop: top}, 1500);
    });


    $('input[type="tel"]').mask('+7 (000) 000-00-00', { placeholder: "+7 (___) ___-__-__"} );


    // equal heights
    const maxHeightEl = 0;
    $("itemName").each(function(){
        if ($(this).height() > maxHeightEl) { maxHeightEl = $(this).height(); }
    });
    $("itemName").height(maxHeightEl);
    
    
    // scrolling function
    $(window).scroll(function() {
        
        if ( $(window).scrollTop() > 70 ){
            $('.header').addClass('fixed');
        } else {
            $('.header').removeClass('fixed');
        }
       
    });


});

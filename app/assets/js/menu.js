// menu
const menu = $('.header-menu');
const hamburger = $('.hamburger');

const menuInit = () => {
    if (document.documentElement.clientWidth < 992) {

        $('.hamburger').on('click', function () {
            if (hamburger.hasClass('is-active')) {
                hamburger.removeClass('is-active');
                // menu.removeClass('open');
                menu.stop().slideUp();
                $('body').removeClass('menu-open');
            } else {
                hamburger.addClass('is-active');
                // menu.addClass('open');
                menu.stop().slideDown();
                $('body').addClass('menu-open');
            }
        });

        $(document).on('click', function (e) {
            if (
                $(e.target).closest($('.hamburger')).length
                || $(e.target).closest($('.header-menu')).length
            ) {
                return
            };
            hamburger.removeClass('is-active');
            // menu.removeClass('open');
            menu.stop().slideUp();
            $('body').removeClass('menu-open');
        });

    };
}

export default menuInit;

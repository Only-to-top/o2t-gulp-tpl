// menu
const menu = $('.header-menu');
const hamburger = $('.hamburger');

const menuInit = () => {
    $(document).mouseup(function (e) {
        if (e.target.className === 'hamburger') {
            hamburger.addClass('is-active');
            // menu.stop().slideDown();
            menu.addClass('open');
            $('body').css('overflow', 'hidden');
        } else if (e.target.className === 'hamburger is-active') {
            hamburger.removeClass('is-active');
            menu.removeClass('open');
            // menu.stop().slideUp();
            $('body').css('overflow', 'visible');
        } else if ((menu.has(e.target).length === 0) && (hamburger.has(e.target).length === 0)) {
            if (document.documentElement.clientWidth < 768) {
                hamburger.removeClass('is-active');
                menu.removeClass('open');
                // menu.stop().slideUp();
                $('body').css('overflow', 'visible');
            }
        }
    });
}

export default menuInit;

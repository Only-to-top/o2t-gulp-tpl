const popups = () => {

    $('[data-fancybox]').fancybox({
        animationEffect: 'fade',
        animationDuration: 555,
        btnTpl: {
            smallBtn: `<button data-fancybox-close class="fancybox-button fancybox-close-small" title="Закрыть">✕</button>`,
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

    $('.btn-order').on('click', () => {
        $.fancybox.open({
            src: '#popup_order',
            type: 'inline', // Content type: image|inline|ajax|iframe|html (optional)
            opts: {
                topRatio: 0,
                btnTpl: {
                    smallBtn: `<button data-fancybox-close class="fancybox-button fancybox-close-small">✕</button>`,
                },
                afterLoad: function (instance, current) {
                    $("#popup_order").parents('.fancybox-slide').css({ 'text-align': 'right' });
                },
            },

        });
    });

    // popup gallery
    $('[data-fancybox="gallery"]').fancybox({
        loop: true,
        animationEffect: "fade",
        transitionEffect: "circular",
    });

}

export default popups;
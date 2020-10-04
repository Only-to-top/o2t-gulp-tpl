const popups = () => {

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

}

export default popups;
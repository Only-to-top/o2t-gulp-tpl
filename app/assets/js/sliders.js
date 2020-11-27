const sliders = () => {
    // Swiper slider
    if (document.querySelector(".swiper-container--1x")) {
        new Swiper(".swiper-container--1x", {
            // pagination: { el: ".swiper-pagination--1x", clickable: true },
            navigation: { prevEl: ".swiper-button-prev--1x", nextEl: ".swiper-button-next--1x" },
            autoplay: { delay: 6500, disableOnInteraction: false, },
            spaceBetween: 20,
            grabCursor: true,
            allowTouchMove: true, // touch листание
            touchStartPreventDefault: false, // mouseup events
            loop: true,
            breakpoints: { // mobile first
                0: { slidesPerView: 1 },
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
            },
            on: {
                init() {
                    this.el.addEventListener('mouseenter', () => {
                        this.autoplay.stop();
                    });

                    this.el.addEventListener('mouseleave', () => {
                        this.autoplay.start();
                    });
                }
            },
        });

    };// /swiper slider
}

export default sliders;

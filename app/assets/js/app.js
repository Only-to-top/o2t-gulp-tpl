import menuInit from "./menu.js";
import popups from "./popups.js";
import sliders from "./sliders.js";
import tabsInit from "./tabs.js";
import forms from "./forms.js";

(function ($) {
    $(document).ready(function () {
        menuInit();
        popups();
        sliders();

        $("img, a").on("dragstart", (e) => { e.preventDefault(); });
    });
})(jQuery);

document.addEventListener('DOMContentLoaded', () => {
    tabsInit();
    forms();
});


window.addEventListener('load', () => { });


if (document.documentElement.clientWidth < 768) { };


$(document).on('scroll touchmove', () => { });

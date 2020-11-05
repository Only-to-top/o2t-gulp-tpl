'use strict';

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
    });
})(jQuery);

document.addEventListener('DOMContentLoaded', () => {
    tabsInit();
    forms();
});

if (document.documentElement.clientWidth < 768) {

};

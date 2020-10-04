'use strict';

import menuInit from "./menu.js";
import popups from "./popups.js";
import sliders from "./sliders.js";
import tabsInit from "./tabs.js";
import forms from "./forms.js";

jQuery(() => {
    menuInit();
    popups();
    sliders();
});

document.addEventListener('DOMContentLoaded', () => {
    tabsInit();
    forms();
});

if (document.documentElement.clientWidth < 768) {

};

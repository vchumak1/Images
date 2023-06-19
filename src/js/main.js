"use strict";
import modals from "./modules/modals";
import burger from "./modules/burger";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";

document.addEventListener('DOMContentLoaded', () => {

    modals();
    burger();
    sliders('.feedback-slider-item', 'horisontal', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical', '', '');
    forms();
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');

});
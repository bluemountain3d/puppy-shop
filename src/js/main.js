
import { initProductCards } from "./modules/product-card-functions.js";

import { initProductFilters } from "./modules/filtering.js";

import { initFormValidation } from "./modules/checkout.js";



const homeBtn = document.querySelector('.js-home-btn');
homeBtn.addEventListener('click', (e) => {
  window.scrollTo({top: 0});
  window.location.href = window.location.pathname;
  setTimeout(() => {
    location.reload(true)
  }, 100);
});

const themeSwitchBtn = document.querySelector('.js-theme-switch');
themeSwitchBtn.addEventListener('click', (e) => {
  if (document.body.classList.contains('theme-dark')) {
    document.body.classList.remove('theme-dark');
    themeSwitchBtn.setAttribute('aria-label', 'Byt till ljust tema');
    themeSwitchBtn.setAttribute('title', 'Byt till ljust tema');
  } else {
    document.body.classList.add('theme-dark');
    themeSwitchBtn.setAttribute('aria-label', 'Byt till mörkt tema');
    themeSwitchBtn.setAttribute('title', 'Byt till mörkt tema');
  }
});
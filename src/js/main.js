
import { initProductCards } from "./modules/product-card-functions.js";

import { initProductFilters } from "./modules/filtering.js";

import { initFormValidation } from "./modules/checkout.js";



const homeBtn = document.querySelector('.js-home-btn');
homeBtn.addEventListener('click', (e) => {
  location.reload(true);
});
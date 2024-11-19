import { productsObject } from './_products-object.js';
import { 
  addTextFromArray, 
  formatPrice,
  comparisonPricePerKg,
} from './_utility-functions.js';
import { 
  weekendPricing 
} from './_discount-functions.js';


// Populate products and add functionality
export const productCards = ((products) => {
  const productArray = Object.values(products);
  const productsWrapper = document.querySelector('.products__wrapper');

  // If Product wrapper isn not undefined
  if (productsWrapper) {

    // # # # # # # # # # # # # # #
    // # Populate product cards  #
    // # # # # # # # # # # # # # #
    productArray.forEach(p => {

      // Set price
      const initialPrice = weekendPricing(Number(p.priceInfo.price));

      // Add to inner.html
      productsWrapper.innerHTML += `
        <article class="product-card" data-id="${p.id}" data-rating="${p.properties.popularity}" data-gender="male">
            <div class="product-card__image-wrapper">
              <picture>
                <img 
                  src="${p.image.url}-w1024.jpg"
                  alt="${p.image.alt}"
                  class="product-card__image"
                  width="360" height="360" loading="lazy">
              </picture>
              <div class="product-card__rating" aria-label="Rasens popularitet: ${p.properties.popularity} av 5 tassar">
                ${populateRating(p.properties.popularity)}
              </div>
            </div>
            <div class="product-card__content-wrapper">
              <section class="product-card__info">
                <h3 class="product-card__title">${p.breedInfo.breed}</h3>
                <p class="product-card__byline">${p.breedInfo.byline}</p>
                <div class="class="product-card__tags">
                  ${addTextFromArray(p.breedInfo.type, 'product-card__tag')}
                </div>
                <details class="product-card__details">
                  <summary class="product-card__details-title">Läs mer om rasen..</summary>
                  <h4 class="product-card__details-heading">${p.description.generally.title}</h4>
                  ${addTextFromArray(p.description.generally.text, 'product-card__details-text')}
                </details>
              </section>
              <fieldset class="product-card__gender-choice" aria-label="Välj kön på valpen">
                <label class="product-card__gender">
                  <input type="radio" name="gender-${p.id}" class="product-card__gender-rb js-gender-rb" value="male" checked>
                  <span class="product-card__gender-label">Hane</span>
                </label>
                <label class="product-card__gender">
                  <input type="radio" name="gender-${p.id}" class="product-card__gender-rb js-gender-rb" value="female">
                  <span class="product-card__gender-label">Tik</span>
                </label>
              </fieldset>
              <div class="product-card__price-quantity-group">
                <div class="product-card__pricing">
                  <div class="product-card__item-price">
                    <span class="product-card__price js-price">${formatPrice(initialPrice)}</span>
                    <span class="product-card__price-unit">kr/st</span>
                  </div>
                  <div class="product-card__comparison-price js-comparison-price">${comparisonPricePerKg(initialPrice, p.properties.weight.male)}</div>
                </div>
                <div class="product-card__quantifier js-quantifier">
                  <button class="product-card__quantifier-btn js-decrease" aria-label="Minska antal">&ndash;</button>
                  <input type="number" class="product-card__quantifier-input js-quantity" aria-label="Antal" value="0">
                  <button class="product-card__quantifier-btn js-increase" aria-label="Öka antal">+</button>
                </div>
              </div>
              <button class="product-card__add-to-cart js-add-to-cart" aria-label="Lägg till i varukorgen">
                <svg class="icon">
                  <use href="#add-to-cart-icon" class="add-to-cart-icon"/>
                </svg>
                <span>Lägg i kundvagn</span>
              </button>
            </div>
          </article>
      `
    });
  }
})(productsObject);

// Create rating paws 
function populateRating(rating) {
  const int = parseInt(Math.floor(rating));
  const decimal = (Number(rating) - int).toFixed(1);
  let paws = '';

  for (let i = 1; i <= int; i++) {
    paws += `<svg class="icon">
      <use href="paw-icon" class="paw-icon rating-paw rating-paw--solid"/>
    </svg>`
  }
  if (decimal >= .2) {
    const decimalPercentage = decimal * 100;
    paws += `<svg class="icon">
      <use href="paw-icon" class="paw-icon rating-paw rating-paw--grad-${decimalPercentage}"/>
    </svg>`
  } else if (int < 5) {
    paws += `<svg class="icon">
      <use href="paw-icon" class="paw-icon rating-paw rating-paw--empty"/>
    </svg>`
  }

  return paws;
}

// Object imports
import { 
  productsObject,
  cartItemsObject,
  cartSummaryObject
 } from "./objects.js";

// Utility imports
import { 
  addTextFromArray,
  getHighestIndex,
  findItemByProductIdAndGender,
  adjustQuantity
} from "./utilities.js";

// Pricing imports
import {
  weekendPricing,
  itemQtyDiscount,
  formatPrice,
  comparisonPricePerKg,
  updatePrice,
  updateComparisonPrice,
  formatPriceToNumber,
} from "./pricing.js";

// Cart imports
import {
  updateCartSummary,
  updateHeaderCartCounter,
  addCartItem,
  updateCartItem
} from "./cart-functions.js";


// Product card
export function productCard(obj, loading='lazy', quantity=0) {
  
  const pid = obj.id;
  const imgUrl = obj.image.url;
  const imgAlt = obj.image.alt;
  const rating = obj.properties.popularity;
  const breed = obj.breedInfo.breed;
  const byline = obj.breedInfo.byline;
  const type = obj.breedInfo.type.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(", "); // add all types from array and set first letter to cap
  const infoTitle = obj.description.generally.title;
  const infoText = addTextFromArray(obj.description.generally.text, 'product-card__details-text'); // Make a string of <p> elements from each string in array
  const initialPrice = formatPrice(weekendPricing(Number(obj.priceInfo.price)));
  const kgPrice = comparisonPricePerKg(weekendPricing(Number(obj.priceInfo.price)), Number(obj.properties.weight.male));
  
  const productHTML = /* ?data-rating="${rating}" */
        //<article class="product-card js-product-card" data-pid="${pid}"  data-gender="male" aria-labelledby="product-title-${breed}">
            `<div class="product-card__image-wrapper">
              <picture>
                <img 
                  src="${imgUrl}-w446.avif"
                  alt="${imgAlt}"
                  class="product-card__image"
                  width="446" height="446" loading="${loading}">
              </picture>
              <div class="product-card__rating" role="img" aria-label="Rasens popularitet: ${rating} av 5 tassar">
                ${populateRating(rating)}
              </div>
            </div>
            <div class="product-card__content-wrapper">
              <section class="product-card__info">
                <h3 id="product-title-${breed}" class="product-card__title">${breed}</h3>
                <p class="product-card__byline">${byline}</p>
                <p class="product-card__tags">
                  Hundtyp: ${type}
                </p>
                <details class="accordion product-card__details" name="breed-info">
                  <summary class="product-card__details-title">Läs mer om rasen…</summary>
                  <div class="product-card__details-content"><h4 class="product-card__details-heading">${infoTitle}</h4>
                  ${infoText}</div>
                </details>
              </section>
              <div class="product-card__gender" aria-label="Välj kön på valpen">
                <label class="rb-custom product-card__gender-choice">
                  <input type="radio" name="gender-${pid}" class="product-card__gender-rb js-gender-rb" value="male" checked>
                  <span class="rb-checkmark"></span>
                  <span class="rb-label product-card__gender-label">Hane</span>
                </label>
                <label class="rb-custom product-card__gender-choice">
                  <input type="radio" name="gender-${pid}" class="product-card__gender-rb js-gender-rb" value="female">
                  <span class="rb-checkmark"></span>
                  <span class="rb-label product-card__gender-label">Tik</span>
                </label>
              </div>
              <div class="product-card__price-quantity-group">
                <div class="product-card__pricing">
                  <div class="product-card__item-price-wrapper">
                    <span class="product-card__price js-price">${initialPrice}</span>
                    <span class="product-card__price-unit">kr/st</span>
                  </div>
                  <div class="product-card__price-details">
                    <span class="product-card__original-price js-original-price"></span>
                    <span class="product-card__comparison-price js-comparison-price">${kgPrice}</span>
                  </div>
                </div>
                <div class="product-card__quantifier js-quantifier">
                  <button class="product-card__quantifier-btn js-decrease" aria-label="Minska antal">&minus;</button>
                  <span type="number" class="product-card__quantifier-value js-card-quantity js-quantity" aria-label="Antal" data-pid="${pid}">${quantity}</span>
                  <button class="product-card__quantifier-btn js-increase" aria-label="Öka antal">&plus;</button>
                </div>
              </div>
            </div>
            <button class="product-card__add-to-cart js-add-to-cart" aria-label="Lägg till i varukorgen">
              <svg class="icon" aria-hidden="true">
                <use href="#add-to-cart-icon" class="add-to-cart-icon"/>
              </svg>
              <span>Lägg i kundvagn</span>
            </button>`
          //</article>
      ;

  return productHTML;
}


// Create rating paws 
export function populateRating(rating) {
  const int = Math.floor(rating); // Integer part
  const decimal = rating - int; // Fractional part
  let paws = '';

  // Add solid paws for the integer part
  for (let i = 1; i <= int; i++) {
    paws += `<div class="rating-paw rating-paw--solid"></div>`;
  }

  // Add a partial paw if there is a decimal value
  if (decimal > 0) {
    const decimalPercentage = Math.round(decimal * 100); // Convert to percentage
    paws += `<div class="rating-paw rating-paw--grad-${decimalPercentage}"></div>`;
  }

  // Add empty paws for the remaining slots
  const totalPaws = decimal > 0 ? int + 1 : int; // Adjust total paws if a partial one is added
  for (let i = 1; i <= 5 - totalPaws; i++) {
    paws += `<div class="rating-paw rating-paw--empty"></div>`;
  }

  return paws;
}


// Update card price every x minute
export function setCardUpdateInterval(interval=15) {
  // Update pricing every X interval in miliseconds
  const updateInterval = 1000 * 60 * interval;
  setInterval(() => {
    const productsWrapper = document.querySelector('.js-products');
    const productCards = Array.from(productsWrapper.querySelectorAll('.js-product-card'));
    productCards.forEach(card => {
      // If card not undefined
      if (card) {
        const productId = card.dataset.pid;
        const productData = productsObject[productId];

        updatePrice(card, productData);
        updateComparisonPrice(card, productData);
      }
    });
  }, updateInterval);
}


// Event handler function
function handleProductCardEvent(e) {

  const card = e.target.closest('.js-product-card'); // Find the product card related to target
  if (!card) return; // Exit if not within a product card

  const productId = Number(card.dataset.pid); // Get "pid" from card
  const productData = productsObject[productId]; // Product Object from Card "pid"
  const gender = card.querySelector('.js-gender-rb:checked').value; // Get selected gender
  const itemData = findItemByProductIdAndGender(cartItemsObject, productId, gender);

  //* Handle events based on target *//

  // If target is radio button
  if (e.target.matches('.js-gender-rb')) {    
    updatePrice(card, productData); // Update price when gender radio button changes
    updateComparisonPrice(card, productData); // Update comparison based on selected gender weight
  }
  
  // If target is buttons of input in quantifier group
  if (e.target.matches('.js-increase') || 
      e.target.matches('.js-decrease')) {

    adjustQuantity(e, card, productData); // Update quantity input
    updateComparisonPrice(card, productData); // Update comparison price if item discount is valid
  }

  //Add to cart object when add to cart button is clicked
  if (e.type == 'click' && e.target.matches('.js-add-to-cart')) {
    
    const quantityValue = card.querySelector(`span[data-pid="${productId}"].js-card-quantity`);
    const quantity = Number(quantityValue.innerText);
    
    if (!quantity) return; // Stop id quantity is 0

    const basePrice = Number(productData.priceInfo.price); // Original price set in productsObject
    const adjustedPrice = Number(weekendPricing(basePrice)); // 
    const discountPrice = Number(itemQtyDiscount(adjustedPrice, quantity));
    const discount = adjustedPrice - discountPrice;
    const counter = cartSummaryObject.counter;
    

    // Test if cartItem should be added or updated
    // If cart item donesn't exist, or if cart item exist, item gender is not equal to card gender
    if (!itemData || itemData && itemData.gender != gender) { 
      
      // Create new cart item
      const newItem = {
        productId: productId,
        gender: gender,
        quantity: quantity,
        priceInfo: {
          price: discountPrice,
          discount: discount * quantity,
          lineTotal: (discountPrice * quantity) - discount
        },
      }

      // Add the new item to the cartObject to the next available index.
      cartItemsObject[getHighestIndex(cartItemsObject) + 1] = newItem;
      
      // Update Cart Object Counter
      cartSummaryObject.counter += quantity;

      // Update cart summary
      updateCartSummary();

      // Add cart Item to Items Container
      addCartItem(newItem, productData);

      // Update header cart counter
      updateHeaderCartCounter(cartSummaryObject);

      // Reset input
      quantityValue.innerText = 0;
    } else {
      // Product is in cart, update

      // Set new quantity
      const newQuantity = quantity + Number(itemData.quantity);
      
      // Update Cart Object
      updateCartItem(itemData, newQuantity, discountPrice, discount);

      // Update Cart Object Counter
      cartSummaryObject.counter += quantity;

      // Update cart summary
      updateCartSummary();
    
      //cartSummaryObject.counter = Math.max(counter + diff, 0);
      updateHeaderCartCounter(cartSummaryObject);

      // Reset input
      quantityValue.innerText = 0;
    }
  }
}


/**
 * Creates and renders product cards dynamically based on screen width.
 * 
 * @param {HTMLElement} wrapper - The parent container element where product cards will be appended
 * @param {Array} array - An array of product items to be converted into cards
 * 
 * @description
 * This function does the following:
 * 1. Determines the number of "eager" loaded images based on current screen width
 * 2. Creates a DocumentFragment to optimize DOM updates
 * 3. Generates product cards for each item in the input array
 * 4. Sets loading strategy (eager/lazy) for images based on screen breakpoints
 * 5. Adds data attributes and accessibility labels to each card
 * 6. Efficiently appends all cards to the wrapper in a single operation
 */
export function createProductCards(wrapper, array) {
  
  // Determine the number of "eager" images based on the breakpoint
  const breakpoint = window.innerWidth;
  const eagerCount = (() => {
    if (breakpoint > 1920) return 10;
    if (breakpoint > 1774) return 5;
    if (breakpoint > 1416) return 4;
    if (breakpoint > 1058) return 3;
    if (breakpoint > 699) return 2;
    return 1;
  })();

  // Create a DocumentFragment to batch DOM updates
  const fragment = document.createDocumentFragment();

  // Populate filtered product cards
  array.forEach((item, index) => {
    const eager = index < eagerCount ? 'eager' : 'lazy';

    const card = document.createElement('article');
    card.className = 'product-card js-product-card';
    card.setAttribute('data-pid', item.id);
    card.setAttribute('data-gender', 'male');
    card.setAttribute('aria-labelledby', `product-title-${item.breedInfo.breed}`);

    // Populate innerHTML using the productCard function
    card.innerHTML = productCard(item, eager);

    // Append the card to the fragment
    fragment.appendChild(card);
  });

  // Append all cards at once
  wrapper.appendChild(fragment);
}


export const initProductCards = (() => {
  // const productArray = shuffleArray(Object.values(productsObject));
  const productsArray = Object.values(productsObject);
  const productsWrapper = document.querySelector('.js-products');
  
  createProductCards(productsWrapper, productsArray);


  //*---------- Functionality ----------*//

  // Attach event listeners to the products wrapper
  productsWrapper.addEventListener('click', handleProductCardEvent);
  productsWrapper.addEventListener('change', handleProductCardEvent);

  // Update card price every x minute
  setCardUpdateInterval(15);

})();
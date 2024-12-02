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
export function productCard(obj, quantity=0) {
  //console.log('productCard() Called');
  
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
  
  const card = `
        <article class="product-card js-product-card" data-pid="${pid}" data-rating="${rating}" data-gender="male">
            <div class="product-card__image-wrapper">
              <picture>
                <img 
                  src="${imgUrl}-w512.avif"
                  alt="${imgAlt}"
                  class="product-card__image"
                  width="360" height="360" loading="lazy">
              </picture>
              <div class="product-card__rating" aria-label="Rasens popularitet: ${rating} av 5 tassar">
                ${populateRating(rating)}
              </div>
            </div>
            <div class="product-card__content-wrapper">
              <section class="product-card__info">
                <h3 class="product-card__title">${breed}</h3>
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
              <fieldset class="product-card__gender" aria-label="Välj kön på valpen">
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
              </fieldset>
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
                  <button class="product-card__quantifier-btn js-decrease" aria-label="Minska antal">−</button>
                  <input type="number" class="product-card__quantifier-input js-quantity" aria-label="Antal" value="${quantity}" disabled>
                  <button class="product-card__quantifier-btn js-increase" aria-label="Öka antal">+</button>
                </div>
              </div>
            </div>
            <button class="product-card__add-to-cart js-add-to-cart" aria-label="Lägg till i varukorgen">
              <svg class="icon">
                <use href="#add-to-cart-icon" class="add-to-cart-icon"/>
              </svg>
              <span>Lägg i kundvagn</span>
            </button>
          </article>
      `;

  return card;
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

  //* Handle events based on target *//

  // If target is radio button
  if (e.target.matches('.js-gender-rb')) {
    //console.log('Product card gender change event');
    
    updatePrice(card, productData); // Update price when gender radio button changes
    updateComparisonPrice(card, productData); // Update comparison based on selected gender weight
  }
  
  // If target is buttons of input in quantifier group
  if (e.target.matches('.js-quantity') || 
      e.target.matches('.js-increase') || 
      e.target.matches('.js-decrease')) {
    //console.log('Product card quantity event', e.type);

    adjustQuantity(e, card, productData); // Update quantity input
    updateComparisonPrice(card, productData); // Update comparison price if item discount is valid
  }

  //Add to cart object when add to cart button is clicked
  if (e.type == 'click' && e.target.matches('.js-add-to-cart')) {
    //console.log('Add to card clicked');
    const numberInput = card.querySelector('.js-quantity');
    const quantity = Number(numberInput.value);

    if (!quantity) return; // Stop id quantity is 0

    const gender = card.querySelector('.js-gender-rb:checked').value; // OLD genderTranslate[card.querySelector('.js-gender-rb:checked').value];
    const basePrice = Number(productData.priceInfo.price); // Original price set in productsObject
    const adjustedPrice = Number(weekendPricing(basePrice)); // 
    const discountPrice = Number(itemQtyDiscount(adjustedPrice, quantity));
    const discount = adjustedPrice - discountPrice;
    const itemData = findItemByProductIdAndGender(cartItemsObject, productId, gender);
    const counter = cartSummaryObject.counter;

    // console.log('base price', basePrice);
    // console.log('adjusted price', adjustedPrice);
    // console.log('discounted price', discountPrice);
    // console.log('discount', discount);
    

    // Test if cartItem should be added or updated
    // If cart item donesn't exist, or if cart item exist, item gender is not equal to card gender
    if (!itemData || itemData && itemData.gender != gender) {
      // Create new cart item
      //console.log('Product don't exist, Add object');

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

      // Resewt input
      numberInput.value = 0;
      
    } else {
      // Product is in cart, update
      //console.log('Product already exist, Update object');

      // Set new quantity
      const newQuantity = quantity + Number(itemData.quantity);
      // console.log('quantity', quantity);
      // console.log('newQuantity', newQuantity);
      // console.log('cartSummaryObject.counter',cartSummaryObject.counter);
      
      // Update Cart Object
      updateCartItem(itemData, newQuantity, discountPrice, discount);

      // Update Cart Object Counter
      cartSummaryObject.counter += quantity;

      // Update cart summary
      updateCartSummary();
    
      //cartSummaryObject.counter = Math.max(counter + diff, 0);
      updateHeaderCartCounter(cartSummaryObject);

      // Resewt input
      numberInput.value = 0;

    }
  }
}



export const initProductCards = (() => {
  // const productArray = shuffleArray(Object.values(productsObject));
  const productsArray = Object.values(productsObject);
  const productsWrapper = document.querySelector('.js-products');

  // Populate product cards with default values
  productsArray.forEach(item => {
    productsWrapper.innerHTML += productCard(item);
  });


  //*---------- Functionality ----------*//

  // Attach event listeners to the products wrapper
  productsWrapper.addEventListener('click', handleProductCardEvent);
  productsWrapper.addEventListener('keydown', handleProductCardEvent);
  productsWrapper.addEventListener('keyup', handleProductCardEvent);
  productsWrapper.addEventListener('change', handleProductCardEvent);

  // Update card price every x minute
  setCardUpdateInterval(15);

})();
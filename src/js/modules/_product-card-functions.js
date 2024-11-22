import { productsObject } from './_products-object.js';
import { 
  cartObject,
  findItemByProductIdAndGender,
  getHighestIndex,
  addToCartSummary
} from './_cart-functions.js';
import { 
  addTextFromArray, 
  formatPrice, formatPriceToNumber,
  comparisonPricePerKg,
  adjustQuantity,
  updatePrice
} from './_utility-functions.js';
import { 
  weekendPricing,
  itemQtyDiscount
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
        <article class="product-card js-product-card" data-id="${p.id}" data-rating="${p.properties.popularity}" data-gender="male">
            <div class="product-card__image-wrapper">
              <picture>
                <img 
                  src="${p.image.url}-w512.avif"
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
                <p class="product-card__tags">
                  ${p.breedInfo.type.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(", ")/* capitalize each string and join */}
                </p>
                <details class="product-card__details">
                  <summary class="product-card__details-title">Läs mer om rasen..</summary>
                  <div class="product-card__details-content"><h4 class="product-card__details-heading">${p.description.generally.title}</h4>
                  ${addTextFromArray(p.description.generally.text, 'product-card__details-text')}</div>
                </details>
              </section>
              <fieldset class="product-card__gender" aria-label="Välj kön på valpen">
                <label class="rb-custom product-card__gender-choice">
                  <input type="radio" name="gender-${p.id}" class="product-card__gender-rb js-gender-rb" value="male" checked>
                  <span class="rb-checkmark"></span>
                  <span class="rb-label product-card__gender-label">Hane</span>
                </label>
                <label class="rb-custom product-card__gender-choice">
                  <input type="radio" name="gender-${p.id}" class="product-card__gender-rb js-gender-rb" value="female">
                  <span class="rb-checkmark"></span>
                  <span class="rb-label product-card__gender-label">Tik</span>
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
            </div>
            <button class="product-card__add-to-cart js-add-to-cart" aria-label="Lägg till i varukorgen">
              <svg class="icon">
                <use href="#add-to-cart-icon" class="add-to-cart-icon"/>
              </svg>
              <span>Lägg i kundvagn</span>
            </button>
          </article>
      `
    });
  }

  // Create rating paws 
  function populateRating(rating) {
    const int = parseInt(Math.floor(rating));
    const decimal = (Number(rating) - int).toFixed(1);
    let paws = '';

    for (let i = 1; i <= int; i++) {
      paws += `<div class="rating-paw rating-paw--solid"></div>`
      // paws += `<div class="rating-paw rating-paw--solid"><svg class="icon paw-icon">
      //   <use href="paw-icon"/>
      // </svg></div>`
    }
    if (decimal >= .2) {
      const decimalPercentage = decimal * 100;
      paws += `<div class="rating-paw rating-paw--grad-${decimalPercentage}"></div>`
      // paws += `<div class="rating-paw rating-paw--grad-${decimalPercentage}"><svg class="icon paw-icon">
      //   <use href="paw-icon"/>
      // </svg></div>`
    }
    for (let i = 1; i <= 5 - int; i++) {
        paws += `<div class="rating-paw rating-paw--empty"></div>`
      // paws += `<div class="rating-paw rating-paw--empty"><svg class="icon paw-icon">
      //   <use href="paw-icon"/>
      // </svg></div>`
    }

    return paws;
  }



  // # # # # # # # # # # # # # # #
  // # Product Card Funtionality #
  // # # # # # # # # # # # # # # #

  // Update pricing every X minutes
  const xMinutes = 15;
  const updateInterval = 1000 * 60 * xMinutes;
  setInterval(() => {
    const productCards = Array.from(productsWrapper.querySelectorAll('.js-product-card'));
    productCards.forEach(card => {
      // If card not undefined
      if (card) {
        const productId = card.dataset.id;
        const productData = products[productId];

        updatePrice(card, productData);
        updateComparisonPrice(card, productData);
      }
    });
  }, updateInterval);

  
  // Attach event listeners to the products wrapper
  productsWrapper.addEventListener('click', handleProductEvent);
  productsWrapper.addEventListener('keydown', handleProductEvent);
  productsWrapper.addEventListener('keyup', handleProductEvent);
  productsWrapper.addEventListener('change', handleProductEvent);

  // Function for change and event listeners
  function handleProductEvent(e) {
    
    // Find the product card related to target
    const card = e.target.closest('.js-product-card');
    if (!card) return; // Exit if not within a product card

    const productId = Number(card.dataset.id);
    const productData = products[productId];

    // Handle events based on target
    if (e.target.matches('.js-gender-rb')) {
      // Update price when gender radio button changes
      updatePrice(card, productData);
    }
    
    if (e.target.matches('.js-quantity') || 
        e.target.matches('.js-increase') || 
        e.target.matches('.js-decrease')) {
      adjustQuantity(e, card, productData);
    }

    // Update Comparison Price
    updateComparisonPrice(card, productData);



    // Add to cart object if Add to cart button is clicked
    if (e.type == 'click' && e.target.matches('.js-add-to-cart')) {
      console.log('Add to card clicked');

      const gender = card.querySelector('.js-gender-rb:checked').value;
      const quantity = Number(card.querySelector('.js-quantity').value);
      const originalPrice = productData.priceInfo.price;
      const currentPrice = formatPriceToNumber(card.querySelector('.js-price').innerText);
      const discount = currentPrice - itemQtyDiscount(currentPrice, quantity);
      const cartItem = findItemByProductIdAndGender(cartObject, productId, gender);
      const counter = cartObject.counter;

      if (!quantity) return;

      //console.log('cartItem:', cartItem);
      //console.log('productId:', productId);
      //console.log('gender:', gender);
      
      // Test if cartItem should be added or updated
      if (!cartItem|| cartItem && cartItem.gender != gender) {
        // Product not in cart, add
        console.log('Product don\'t exist Add object');
        // New cart item
        const newItem = {
          productId: productId,
          gender: gender,
          quantity: quantity,
          priceInfo: {
            price: originalPrice,            
            discount: discount,         
            lineTotal: currentPrice * quantity
          },
        }

        // Add the new item to the cartObject to the next available index.
        cartObject[getHighestIndex(cartObject) + 1] = newItem;
        //console.log(cartObject);

        // Add to cart summary
        addToCartSummary(originalPrice, discount);
        

      } else {
        // Product is in cart, update
        console.log('Product exist Update object');
        // Get Existing Item from cartObject
        const existingItem = findItemByProductIdAndGender(cartObject, productId, gender);
        existingItem.quantity += quantity;
        // 
        if (existingItem.quantity >= 10) {
          const newCurrentPrice = weekendPricing(existingItem.priceInfo.price) * existingItem.quantity;
          existingItem.priceInfo.discount = newCurrentPrice - itemQtyDiscount(newCurrentPrice, existingItem.quantity);
        } else {
          existingItem.priceInfo.discount += discount;
        }
        existingItem.priceInfo.lineTotal += (currentPrice * quantity);
        //console.log(cartObject);

        // Add to cart summary
        addToCartSummary(originalPrice, discount);

      }

      // Update Header Cart Counter
      cartObject.counter += quantity;
      console.log(cartObject, cartObject.counter);

      // Update Header cart counter and total
      const headerToCart = document.querySelector('.header__go-to-cart');
      const headerCount = document.querySelector('.header__cart-count');
      const headerTotal = document.querySelector('.header__cart-total');

      if (cartObject.counter > 0) {
        headerCount.innerText = `${cartObject.counter} st,`;
        headerTotal.innerText = `${cartObject.cartSummary.total} kr`;

        if (window.innerWidth >= 720) {
          headerToCart.classList.remove('hidden');
          headerTotal.classList.remove('hidden');
        }

      } else {
        headerCount.innerText = '0';
        headerToCart.classList.add('hidden');
        headerTotal.classList.add('hidden');
      }


      // Show Added to cart dialog

    }
  }


  // local help function to update comparison price
  function updateComparisonPrice(card, product) {
    // Get selected gender
    const selectedGender = card.querySelector('.js-gender-rb:checked').value;
    // Get price
    const price = formatPriceToNumber(card.querySelector('.js-price').innerText);
    // Get the weight based on the selected gender
    const weight = product.properties.weight[selectedGender];
    // Calculate the price per kg
    const pricePerKg = comparisonPricePerKg(price, weight);
    // Update the comparison price in the card
    const comparisonPriceElem = card.querySelector('.js-comparison-price');
    if (comparisonPriceElem) {
      comparisonPriceElem.textContent = `${pricePerKg}`;
    }
  }
    
})(productsObject);
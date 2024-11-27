import { productsObject } from './_products-object.mjs';
import { 
  cartObject,
  genderTranslate,
  findItemByProductIdAndGender,
  getHighestIndex,
  addToCartSummary,
  updateCartSummary,
  addCartItem,
  calculateQuantity,
  updateHeaderCartCounter,
  updateCartObject
} from './_cart-functions.mjs';
import { 
  addTextFromArray, 
  formatPrice, formatPriceToNumber,
  comparisonPricePerKg,
  adjustQuantity,
  updatePrice,
  updateComparisonPrice
} from './_utility-functions.mjs';
import { 
  weekendPricing,
  itemQtyDiscount,
  calculateDiscount
} from './_discount-functions.mjs';


// Populate products and add functionality
export const productCards = ((products) => {
  const productArray = shuffleArray(Object.values(products));
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
        <article class="product-card js-product-card" data-pid="${p.id}" data-rating="${p.properties.popularity}" data-gender="male">
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
                  Hundtyp: ${p.breedInfo.type.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(", ")/* capitalize each string and join */}
                </p>
                <details class="accordion product-card__details" name="breed-info">
                  <summary class="product-card__details-title">Läs mer om rasen…</summary>
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
                  <div class="product-card__item-price-wrapper">
                    <span class="product-card__price js-price">${formatPrice(initialPrice)}</span>
                    <span class="product-card__price-unit">kr/st</span>
                  </div>
                  <div class="product-card__price-details">
                    <span class="product-card__original-price js-original-price"></span>
                    <span class="product-card__comparison-price js-comparison-price">${comparisonPricePerKg(initialPrice, p.properties.weight.male)}</span>
                  </div>
                </div>
                <div class="product-card__quantifier js-quantifier">
                  <button class="product-card__quantifier-btn js-decrease" aria-label="Minska antal">−</button>
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
      paws += `<div class="rating-paw rating-paw--solid"></div>`;
    }
    if (decimal >= .2) {
      const decimalPercentage = decimal * 100;
      paws += `<div class="rating-paw rating-paw--grad-${decimalPercentage}"></div>`;
    }
    for (let i = 1; i <= 5 - int; i++) {
      paws += `<div class="rating-paw rating-paw--empty"></div>`;
    }

    return paws;
  }

  // Shuffle array //! Move to utilities
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i
      const j = Math.floor(Math.random() * (i + 1));
  
      // Swap elements at indices i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
        const productId = card.dataset.pid;
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

    const productId = Number(card.dataset.pid);
    const productData = products[productId];
    

    // Handle events based on target
    if (e.target.matches('.js-gender-rb')) {
      // Update price when gender radio button changes
      updatePrice(card, productData);
      updateComparisonPrice(card, productData);
    }
    
    if (e.target.matches('.js-quantity') || 
        e.target.matches('.js-increase') || 
        e.target.matches('.js-decrease')) {
      adjustQuantity(e, card, productData);
      updateComparisonPrice(card, productData);
    }

    // Update Comparison Price
    //updateComparisonPrice(card, productData);



    // Add to cart object if Add to cart button is clicked
    if (e.type == 'click' && e.target.matches('.js-add-to-cart')) {
      console.log('Add to card clicked');

      const gender = genderTranslate[card.querySelector('.js-gender-rb:checked').value];
      const quantity = Number(card.querySelector('.js-quantity').value);
      const originalPrice = productData.priceInfo.price;
      const currentPrice = formatPriceToNumber(card.querySelector('.js-price').innerText);
      const discount = currentPrice - itemQtyDiscount(currentPrice, quantity);
      const cartItem = findItemByProductIdAndGender(cartObject, productId, gender);
      const counter = cartObject.counter;

      console.log('add', discount);
      

      if (!quantity) return;

      //console.log('cartItem:', cartItem);
      //console.log('productId:', productId);
      //console.log('gender:', gender);
      
      // Test if cartItem should be added or updated
      if (!cartItem || cartItem && cartItem.gender != gender) {
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
        console.log('cartObject Before add:', cartObject);
        cartObject[getHighestIndex(cartObject) + 1] = newItem;
        console.log('cartObject After add:', cartObject);

        // Cart Object Counter
        cartObject.counter += quantity;

        // Update cart summary
        updateCartSummary(card, newItem, quantity, 0, currentPrice, discount);
        //addToCartSummary(quantity, originalPrice, discount);
        // Add cart Item to Items Containser
        addCartItem(newItem, productData);
        
        // Update header counter
        updateHeaderCartCounter(cartObject);

      } else {
        // Product is in cart, update
        console.log('Product exist Update object');
        // Get Existing Item Object from cartObject
        const itemObj = findItemByProductIdAndGender(cartObject, productId, gender);
        
        console.log('cartObject Before update:', cartObject);
        // Update Cart Object
        updateCartObject(card, itemObj, cartObject);
        // Update header counter
        updateHeaderCartCounter(cartObject);
        console.log('cartObject After update:', cartObject);





        // itemObj.quantity += quantity;
        // if (itemObj.quantity >= 10) {
        //   const newCurrentPrice = weekendPricing(itemObj.priceInfo.price) * itemObj.quantity;
        //   itemObj.priceInfo.discount = newCurrentPrice - itemQtyDiscount(newCurrentPrice, itemObj.quantity);
        // } else {
        //   itemObj.priceInfo.discount += discount;
        // }
        // itemObj.priceInfo.lineTotal += (currentPrice * quantity);
        // //console.log(cartObject);

        // // Add to cart summary
        // addToCartSummary(itemObj.quantity, originalPrice, discount);

      }

      //updateHeaderCartCounter(cartObject);
      // // Update Header Cart Counter
      // cartObject.counter += quantity;
      // console.log(cartObject, cartObject.counter);

      // // Update Header cart counter and total
      // const headerToCart = document.querySelector('.header__to-checkout');
      // const headerCount = document.querySelector('.header__cart-count');
      // const headerTotal = document.querySelector('.header__cart-total');

      // if (cartObject.counter > 0) {
      //   headerCount.innerText = `${cartObject.counter} st,`;
      //   headerTotal.innerText = `${formatPrice(cartObject.cartSummary.total)} kr`;

      //   if (window.innerWidth >= 720) {
      //     headerToCart.classList.remove('hidden');
      //     headerTotal.classList.remove('hidden');
      //   }

      // } else {
      //   headerCount.innerText = '0';
      //   headerToCart.classList.add('hidden');
      //   headerTotal.classList.add('hidden');
      // }

      // // Show Added to cart dialog

    }
  }
    
})(productsObject);
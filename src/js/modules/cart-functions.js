// Objects import
import {
  cartSummaryObject,
  cartItemsObject,
  productsObject
} from "./objects.js";

// Untilites imports
import {
  translateGender,
  sumValues,
  adjustQuantity,
  findKeyByProductIdAndGender
} from "./utilities.js";

// Pricing imports
import {
  formatPrice,
  weekendPricing,
  itemQtyDiscount,
  mondayDiscount,
  getShippingCost,
  availablePaymentMethods
} from "./pricing.js";

import {
  hideSections
} from "./checkout.js";


/**
 * Generates an HTML string for a cart item card.
 *
 * This function creates the structure of a cart item to be displayed in the shopping cart.
 * It includes the product image, title, gender, price, quantity controls, and options to
 * adjust or remove the item. The function dynamically incorporates product and item data
 * into the card.
 *
 * @param {Object} itemData - Data specific to the individual cart item.
 * @param {string} itemData.productId - Unique identifier for the product.
 * @param {string} itemData.gender - Gender associated with the product (e.g., male, female, or unisex).
 * @param {Object} itemData.priceInfo - Object containing price information for the item.
 * @param {number} itemData.priceInfo.price - Unit price of the item.
 * @param {number} itemData.priceInfo.lineTotal - Total price for the item based on quantity.
 * @param {number} itemData.quantity - The current quantity of the item in the cart.
 *
 * @param {Object} productData - Data specific to the product associated with the cart item.
 * @param {Object} productData.image - Image information for the product.
 * @param {string} productData.image.url - URL of the product image.
 * @param {string} productData.image.alt - Alternative text for the product image.
 * @param {Object} productData.breedInfo - Object containing breed information for the product.
 * @param {string} productData.breedInfo.breed - Breed or type name of the product (e.g., "Golden Retriever").
 *
 * @returns {string} - A string containing the HTML markup for the cart item card.
 */
export function cartItemCard(itemData, productData) {
  return `
    <li class="cart__item js-cart-item" data-pid="${itemData.productId}" data-gender="${itemData.gender}">
      <article class="cart__item-content-wrapper">
        <picture class="cart__item-image-wrapper">
          <img class="cart__item-image" src="${productData.image.url}-w512.avif" alt="${productData.image.alt}" width="80" height="80" loading="lazy">
        </picture>
        <section class="cart__item-info js-item-info">
          <h3 class="cart__item-title js-item-title">${productData.breedInfo.breed}</h3>
          <span class="cart__item-gender js-gender">${translateGender(itemData.gender)}</span>
          <span class="cart__item-price js-price">${formatPrice(itemData.priceInfo.price)} kr</span>
          <div class="cart__item-controlls">
            <div class="cart__item-quantity-wrapper js-quantifier">
              <button class="cart__item-decrease js-decrease" aria-label="Minska antal">−</button>
              <span class="cart__item-quantity js-quantity js-quantity-cart" aria-label="Antal">${itemData.quantity}</span>
              <button class="cart__item-increase js-increase" aria-label="Öka antal">+</button>
            </div>
            <button class="cart__item-remove js-remove-item" aria-label="Ta bort">
              <svg class="icon cart__item-remove-icon" aria-hidden="true">
                <use href="#trash-bin-icon"/>
              </svg>
            </button>
          </div>
        </section>              
      </article>
      <div class="cart__item-line-total-wrapper">
        <span class="cart__item-label">Radtotal:</span>
        <span class="cart__item-line-total js-item-line-total">${formatPrice(itemData.priceInfo.lineTotal)} kr</span>
      </div>
    </li>
  `;
}


/**
 * Generates an HTML string for an order summary item card.
 *
 * This function creates the structure for an item displayed in the order summary.
 * It includes the product image, breed information, gender, quantity, and line total.
 * The function dynamically incorporates product and item data into the summary card.
 *
 * @param {Object} itemData - Data specific to the individual item in the order.
 * @param {string} itemData.productId - Unique identifier for the product.
 * @param {string} itemData.gender - Gender associated with the product (e.g., male, female, or unisex).
 * @param {Object} itemData.priceInfo - Object containing price information for the item.
 * @param {number} itemData.priceInfo.lineTotal - Total price for the item based on quantity.
 * @param {number} itemData.quantity - The number of units of the item in the order.
 *
 * @param {Object} productData - Data specific to the product associated with the order item.
 * @param {Object} productData.image - Image information for the product.
 * @param {string} productData.image.url - URL of the product image.
 * @param {string} productData.image.alt - Alternative text for the product image.
 * @param {Object} productData.breedInfo - Object containing breed information for the product.
 * @param {string} productData.breedInfo.breed - Breed or type name of the product (e.g., "Golden Retriever").
 *
 * @returns {string} - A string containing the HTML markup for the order summary item card.
 */
export function summaryItemCard(itemData, productData) {
  return `
    <li class="order-confirmed__item js-summary-item" data-pid="${itemData.productId}" data-gender="${itemData.gender}">
      <article class="order-confirmed__item-content-wrapper">
        <picture class="order-confirmed__item-image-wrapper">
          <img class="order-confirmed__item-image" src="${productData.image.url}-w512.avif" alt="${productData.image.alt}" width="40" height="40" loading="lazy">
        </picture>
        <section class="order-confirmed__item-info">
          <h4 class="order-confirmed__item-title js-summary-breed">${productData.breedInfo.breed}</h4>
          <div class="order-confirmed__item-row">
            <div>
              <span class="order-confirmed__item-data js-summary-gender">${translateGender(itemData.gender)}, </span>
              <span class="order-confirmed__item-data js-summary-quantity">${itemData.quantity} st</span>
            </div>
            <span class="order-confirmed__item-data js-summary-line-total">${formatPrice(itemData.priceInfo.lineTotal)} kr</span>
          </div>
        </section>
      </article>
    </li>
  `;
  // return `
  //   <li class="order-confirmed__item js-summary-item" data-pid="${itemData.productId}" data-gender="${itemData.gender}">
  //     <article class="order-confirmed__item-content-wrapper">
  //       <picture class="order-confirmed__item-image-wrapper">
  //         <img class="order-confirmed__item-image" src="${productData.image.url}-w512.avif" alt="${productData.image.alt}" width="80" height="80" loading="lazy">
  //       </picture>
  //       <section class="order-confirmed__item-info">
  //         <h4 class="order-confirmed__item-title js-summary-breed">${productData.breedInfo.breed}</h4>
  //         <div class="order-confirmed__item-row">
  //           <span class="order-confirmed__item-label">Ras:</span>
  //           <span class="order-confirmed__item-data js-summary-gender">${translateGender(itemData.gender)}</span>
  //         </div>
  //         <div class="order-confirmed__item-row">
  //           <span class="order-confirmed__item-label">Antal:</span>
  //           <span class="order-confirmed__item-data js-summary-quantity">${itemData.quantity} st</span>
  //         </div>
  //         <div class="order-confirmed__item-row">
  //           <span class="order-confirmed__item-label">Radtotal:</span>
  //           <span class="order-confirmed__item-data js-summary-line-total">${formatPrice(itemData.priceInfo.lineTotal)} kr</span>
  //         </div>
  //       </section>
  //     </article>
  //   </li>
  // `;
}

export function detailsItemCard(itemData, productData) {
  // <li class="checkout__order-details-row js-order-details-item" data-pid="${itemData.productId}" data-gender="${itemData.gender}">
  //   <div>
  //     <span class="js-order-details-quantity"></span>&nbsp;st&nbsp;
  //     <span class="js-order-details-product"></span>&nbsp;
  //     <span class="js-order-details-gender"></span>
  //   </div>
  //   <div class="js-order-details-line-total"></div>
  // </li>
}


/**
 * Adds a cart item to both the cart and the order summary sections.
 *
 * This function dynamically appends a cart item and its corresponding summary item
 * to designated containers in the DOM. It utilizes `cartItemCard` and `summaryItemCard`
 * functions to generate the required HTML for each item and updates the content
 * of all relevant containers.
 *
 * @param {Object} itemData - Data specific to the cart item being added.
 * @param {Object} productData - Data specific to the product associated with the cart item.
 *
 * @returns {void} - This function does not return a value; it directly updates the DOM.
 */
export function addCartItem(itemData, productData) {

  // Debugg
  console.log(
    'addCartItem() Called',
    // '\nitemData', itemData,
    // '\nproductData', productData
  );
  
  // Add Header Cart and Checkout Cart in an array
  const itemContainers = Array.from(document.querySelectorAll('.js-cart-items'));
  const summaryItemContainers = Array.from(document.querySelectorAll('.js-summary-items'));

  itemContainers.forEach(container => {
    container.innerHTML += cartItemCard(itemData, productData);
  });

  summaryItemContainers.forEach(container => {
    container.innerHTML += summaryItemCard(itemData, productData);
  });
}


/**
 * Updates a cart item's quantity, discount price, and line total in both the cart and order summary sections.
 *
 * This function modifies the quantity and pricing information for a specific cart item
 * and updates the corresponding elements in the DOM. It ensures that the cart and
 * order summary sections reflect the updated values.
 *
 * @param {Object} itemData - Data specific to the cart item being updated.
 * @param {string} itemData.productId - Unique identifier for the product.
 * @param {string} itemData.gender - Gender associated with the product (e.g., male, female, or unisex).
 * @param {Object} itemData.priceInfo - Object containing price information for the item.
 * @param {number} itemData.priceInfo.price - Current price per unit of the item.
 * @param {number} itemData.priceInfo.lineTotal - Total price for the item based on quantity.
 * @param {number} quantity - The updated quantity of the item.
 * @param {number} discountPrice - The discounted price per unit of the item.
 * @param {number} discount - The total discount applied to the item (per unit).
 *
 * @returns {void} - This function does not return a value; it directly updates the DOM.
 */
export function updateCartItem(itemData, quantity, discountPrice, discount) {
  console.log(
    'updateCartItem() Called',
  );

  // Get Element
  const itemContainers = Array.from(document.querySelectorAll('.js-cart-items'));
  const summaryItemContainers = Array.from(document.querySelectorAll('.js-summary-items'));
  const productId = Number(itemData.productId);
  const gender = itemData.gender;

  // Update Item
  itemData.quantity = quantity;
  itemData.priceInfo.price = discountPrice;
  itemData.priceInfo.discount = discount * quantity;
  itemData.priceInfo.lineTotal = discountPrice * quantity


  // Debugg
  // console.log(
    // '\nitemData.quantity', itemData.quantity,
    // '\ndiscountPrice', discountPrice,
    // '\ndiscount', discount,
    // '\nproductId', productId,
    // '\ngender', gender,
    // '\nitemData', itemData
  // );
  
  // Update carts
  itemContainers.forEach(container => {

    // Item
    const item = container.querySelector(`.js-cart-item[data-pid="${productId}"][data-gender="${gender}"]`);
    // Get item elements
    const priceElem = item.querySelector('.js-price');
    const quantityElem = item.querySelector('.js-quantity-cart');
    const itemLineTotalElem = item.querySelector('.js-item-line-total');

    // Update item price text
    if (priceElem) priceElem.innerText = `${formatPrice(discountPrice)} kr`;
    // Update item quantity
    if (quantityElem) quantityElem.innerText = quantity;
    // Update item line total
    if (itemLineTotalElem) itemLineTotalElem.innerText = `${formatPrice(discountPrice * quantity)} kr`;
  });

  // Update summary 
  summaryItemContainers.forEach(container => {
    // Item
    const item = container.querySelector(`.js-summary-item[data-pid="${productId}"][data-gender="${gender}"]`);
    // Get Item elements
    const sumQuantityElem = item.querySelector('.js-summary-quantity');
    const sumLineTotalElem = item.querySelector('.js-summary-line-total');
    
    if (sumQuantityElem) sumQuantityElem.innerText = quantity;
    if (sumLineTotalElem) sumLineTotalElem.innerText = `${formatPrice(discountPrice * quantity)} kr`;
  });

}


/**
 * Removes an item from the cart and order summary.
 *
 * This function deletes a specified cart item from both the `cartItemsObj` object
 * and its corresponding DOM elements in all cart and summary containers. It also
 * updates the cart counter to reflect the removal.
 *
 * @param {Event} e - The event object associated with the remove action (e.g., click event).
 * @param {string|number} id - The unique identifier for the product to be removed.
 * @param {string} gender - The gender associated with the product (e.g., male, female, or unisex).
 * @param {string} cartKey - The key identifying the cart item in the `cartItemsObj` object.
 * @param {Object} cartItemsObj - The object holding all current cart items, indexed by their keys.
 *
 * @returns {void} - This function does not return a value; it directly updates the DOM and the cart object.
 */
export function removeCartItem(e, id, gender, cartKey, cartItemsObj) {

  const itemContainers = Array.from(document.querySelectorAll('.js-cart-items')); // Find all containers holding cart items
  const summaryItemContainers = Array.from(document.querySelectorAll('.js-summary-items')); // Find all containers holding summary items
  const itemData = cartItemsObj[cartKey];
  
  if (cartKey && itemData) {

    // Update cart counter  
    cartSummaryObject.counter -= itemData.quantity;
    
    // Delete the item from the cart items object
    delete cartItemsObj[cartKey];

    // Remove matching items from each container
    itemContainers.forEach(container => {
      const item = container.querySelector(`.js-cart-item[data-pid="${id}"][data-gender="${gender}"]`);
      if (item) {
        item.remove(); // Remove the DOM element
      }
    });

    summaryItemContainers.forEach(container => {
      const item = container.querySelector(`.js-summary-item[data-pid="${id}"][data-gender="${gender}"]`);
      if (item) {
        item.remove(); // Remove the DOM element
      }
    });

    // Close checkout sections if no cart items remains
    if (Object.keys(cartItemsObj).length === 0) {
      hideSections();
    }

  } else {
    console.warn('Cart key or object not valid. No changes made.');
  }
}


/**
 * Updates the cart summary values and DOM elements based on the current cart contents.
 *
 * This function recalculates and updates various aspects of the cart summary, including subtotal,
 * discounts, VAT, shipping cost, and total price. It dynamically updates the header cart, checkout cart,
 * and order summary sections to reflect the new values. It also handles Monday-specific discounts and
 * adjusts the available payment methods based on the total price.
 *
 * @returns {void} - This function does not return a value; it directly updates the DOM and the global
 *                   `cartSummaryObject` with the latest cart summary values.
 */
export function updateCartSummary() {
  const counter = cartSummaryObject.counter;
  
  // Get elements
  const cartSubtotal = document.querySelectorAll('.js-cart-subtotal');
  const cartMondayDiscountElem = document.querySelector('.js-cart-monday-discount');
  const cartDiscounts = document.querySelector('.js-cart-discounts');
  const cartShipping = document.querySelector('.js-cart-shipping');
  const cartTotal = document.querySelector('.js-cart-total');

  // New subtotal
  const subtotal = sumValues(cartItemsObject, 'priceInfo.lineTotal');
  const discounts = sumValues(cartItemsObject, 'priceInfo.discount');
  const monDiscount = Math.abs((mondayDiscount(subtotal) - subtotal));
  const newSubtotal = subtotal ; //- monDiscount - discounts;
  const newDiscounts = discounts + monDiscount;
  
  // Update shipping cost
  const shippingCost = getShippingCost(newSubtotal, counter);

  // Debugg
  // console.log(
  //   'updateCartSummary() Called',
  //   '\ncounter',counter,
  //   '\nsubtotal',subtotal,
  //   '\ndiscounts',discounts,
  //   '\nmonDiscount',monDiscount,
  //   '\nnewSubtotal',newSubtotal,
  //   '\nnewDiscounts',newDiscounts,
  //   '\nshippingCost',shippingCost,
  // );
  
  //cartQtyDiscount(subtotal, counter, limit=15, discount=.9)
  // Set new values
  cartSummaryObject.subtotal = newSubtotal;
  cartSummaryObject.discounts = newDiscounts;
  cartSummaryObject.shippingCost = shippingCost
  cartSummaryObject.vat = Math.round(newSubtotal * .2);
  cartSummaryObject.total = newSubtotal + shippingCost - newDiscounts;

  // Header and Checkout Cart Subtotal
  cartSubtotal.forEach(sub => {
    sub.innerText = `${formatPrice(newSubtotal)} kr`;
  });

  // Discounts
  cartDiscounts.innerText = `${formatPrice(-discounts)} kr`;
  
  // if monday discount is applied show text
  if (mondayDiscount()) {
    cartMondayDiscountElem.innerText = 'Måndagsrabatt: 10 % på hela beställningen';
    cartMondayDiscountElem.classList.remove('hidden');
  }

  // Checkout Cart Shipping Cost
  if (counter) {
    cartShipping.innerText = shippingCost 
      ? `${formatPrice(shippingCost)} kr` 
      : 'Frakten kostar gratis!';
  } else {
    cartShipping.innerText = '0 kr'
  }
  
  // Checkout Cart Total
  cartTotal.innerText = `${formatPrice(newSubtotal + shippingCost)} kr`;

  // Update payment methods
  availablePaymentMethods('invoice', 80000);


  // Get summary containers
  const summaryItemContainers = Array.from(document.querySelectorAll('.js-summary'));

  summaryItemContainers.forEach(container => {
    // Get summary elements in container
    const sumSubtotalElem = container.querySelector('.js-summary-subtotal');
    const sumDiscountsElem = container.querySelector('.js-summary-discounts');
    const sumVatElem = container.querySelector('.js-summary-vat');
    const sumShippingElem = container.querySelector('.js-summary-shipping');
    const sumTotalElem = container.querySelector('.js-summary-total');

    if (sumSubtotalElem) {
      sumSubtotalElem.innerText = `${formatPrice(subtotal)} kr`;
    }
    if (sumDiscountsElem) {
      sumDiscountsElem.innerText = `${formatPrice(newDiscounts * -1)} kr`;
    }
    if (sumVatElem) {
      sumVatElem.innerText = `${formatPrice(Math.round((newSubtotal - newDiscounts) * .2))} kr`;
    }
    if (sumShippingElem) {
      sumShippingElem.innerText = shippingCost 
        ? `${formatPrice(shippingCost)} kr` 
        : 'Frakten kostar gratis!';
    }
    if (sumTotalElem) {
      sumTotalElem.innerText = `${formatPrice(subtotal - newDiscounts + shippingCost)} kr`;
    }
  });
  
  //sumValues(cartItemsObject, 'priceInfo.discount');
}


/**
 * Updates the header cart counter and related elements based on the current cart state.
 *
 * This function modifies the header cart UI to reflect the current number of items in the cart
 * and their total price. It dynamically shows or hides elements and enables or disables the
 * cart interaction based on whether the cart has items. It also applies responsive logic for
 * displaying elements based on the viewport width.
 *
 * @param {Object} cartObj - An object representing the current state of the cart.
 * @param {number} cartObj.counter - The total number of items in the cart.
 * @param {number} cartObj.subtotal - The subtotal price of all items in the cart.
 *
 * @returns {void} - This function does not return a value; it directly updates the DOM.
 */
export function updateHeaderCartCounter(cartObj) {
  
  // Get elements
  const productsSection = document.querySelector('.js-products-section');
  const headerCartOuter = document.querySelector('.js-header-cart-inner');
  const headerCartMobileBtn = document.querySelector('.js-header-cart-mobile-btn');
  const headerCart = document.querySelector('.js-header-cart-btn');
  const headerToCart = document.querySelector('.header__to-checkout');
  const headerCount = document.querySelector('.header__cart-count');
  const headerTotal = document.querySelector('.header__cart-total');

  // Ensure required elements exist
  if (!headerCart || !headerToCart || !headerCount || !headerTotal) {
    console.error('One or more header cart elements are missing.');
    return;
  }
  
  // Define breakpoint for responsive logic
  const breakpoint = 720;

  // Check if cart has items
  const hasItems = Number(cartObj.counter) > 0;

  // Update counter and total text
  headerCount.innerText = hasItems ? `${cartObj.counter} st,` : '0';
  headerTotal.innerText = hasItems ? `${formatPrice(Number(cartObj.subtotal))} kr` : '';

  // Show or hide elements based on cart state and viewport width
  if (hasItems) {
    if (window.innerWidth >= breakpoint) {
      if (productsSection && !productsSection.classList.contains('hidden')) {
        headerToCart.classList.remove('hidden');
      }
      headerTotal.classList.remove('hidden');
    }
    headerCart.removeAttribute('disabled');
    headerCart.removeAttribute('aria-disabled');
  } else {
    headerToCart.classList.add('hidden');
    headerTotal.classList.add('hidden');
    headerCart.setAttribute('disabled', '');
    headerCart.setAttribute('aria-disabled', 'true');
  }

  // Header shaking
  headerCartOuter.classList.add('change');
  headerCartMobileBtn.classList.add('change');
  headerCart.classList.add('change');
  setTimeout(() => {
    headerCartOuter.classList.remove('change');
    headerCartMobileBtn.classList.remove('change');
    headerCart.classList.remove('change');    
  }, 500);
}



//*---------- Cart Show/hide functionality ----------*//

// Get required element
const headerCartMobileBtn = document.querySelector('.js-header-cart-mobile-btn');
const headerCartBtn = document.querySelector('.js-header-cart-btn');
const headerCart = document.querySelector('.js-dropdown-cart');
const goToCheckoutBtns = Array.from(document.querySelectorAll('.js-go-to-checkout'));
const headerGoToBtn = document.querySelector('.header__to-checkout');
const productsSection = document.querySelector('.js-products-section');
const checkoutSection = document.querySelector('.js-checkout-section');

// Set breakpoint true or false
const breakpoint = window.innerWidth > 720;

//* Go to checkout

/**
 * Handles navigation to the checkout section when the mobile cart button is clicked.
 *
 * This event listener is attached to the `headerCartMobileBtn` element. When the button
 * is clicked, it transitions the UI to the checkout section by performing the following actions:
 * - Hides the products section by adding the `hidden` class to `productsSection`.
 * - Reveals the checkout section by removing the `hidden` class from `checkoutSection`.
 *
 * @param {Event} e - The click event triggered by the button.
 * 
 * @returns {void} - This function does not return a value; it directly updates the DOM.
 */
headerCartMobileBtn.addEventListener('click', (e) => {
  productsSection.classList.add('hidden');
  checkoutSection.classList.remove('hidden');
});


/**
 * Handles navigation to the checkout section when "Go to Checkout" buttons are clicked.
 *
 * This code snippet adds a `click` event listener to each button in the `goToCheckoutBtns` list.
 * When a button is clicked, the following actions are performed:
 * - Hides the "Go to Checkout" button in the header by adding the `hidden` class to `headerGoToBtn`.
 * - Hides the products section by adding the `hidden` class to `productsSection`.
 * - Reveals the checkout section by removing the `hidden` class from `checkoutSection`.
 * - Closes the dropdown cart by removing the `active` class from `headerCart`.
 *
 * @returns {void} - This code does not return a value; it directly updates the DOM.
 */
goToCheckoutBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    headerGoToBtn.classList.add('hidden');
    productsSection.classList.add('hidden');
    checkoutSection.classList.remove('hidden');
    headerCart.classList.remove('active');
  });
});


//* header: Show/Hide Dropdown cart
headerCartBtn.addEventListener('click', toggleDropdownCart);
headerCartBtn.addEventListener('mouseenter', showDropdownCart);
headerCart.addEventListener('mouseenter', showDropdownCart);


/**
 * Toggles the visibility of the dropdown cart in the header.
 *
 * This function checks the current state of the header cart and toggles its visibility.
 * If the cart is already open, it hides the cart. If the cart is not open, it ensures that
 * the cart is displayed only if:
 * - The products section is visible.
 * - The cart has items (`cartSummaryObject.counter > 0`).
 * - The viewport width meets the defined breakpoint condition.
 * 
 * Additionally, when the cart is opened, it disables body scrolling for better UX.
 *
 * @returns {void} - This function does not return a value; it directly manipulates DOM elements.
 */
function toggleDropdownCart() {
  if (headerCart.classList.contains('active')) {
    // Hide the cart if it is already open
    headerCart.classList.remove('active');
  } else if (!productsSection.classList.contains('hidden')
             && cartSummaryObject.counter > 0
             && breakpoint) {
    // Show the cart
    headerCart.classList.add('active');
    document.body.classList.add('no-scroll');
  }
}


/**
 * Displays the dropdown cart in the header if certain conditions are met.
 *
 * This function checks whether the dropdown cart can be shown by validating the following conditions:
 * - The `productsSection` is visible (does not have the `hidden` class).
 * - The cart has at least one item (`cartSummaryObject.counter > 0`).
 * - The current viewport width satisfies the defined `breakpoint` condition.
 *
 * If all conditions are met, the function:
 * - Adds the `active` class to `headerCart` to display the dropdown cart.
 * - Adds the `no-scroll` class to the `<body>` element to disable scrolling while the cart is visible.
 *
 * @returns {void} - This function does not return a value; it directly updates the DOM.
 */
function showDropdownCart() {
  if (!productsSection.classList.contains('hidden') 
      && cartSummaryObject.counter > 0
      && breakpoint) {
    headerCart.classList.add('active');
    document.body.classList.add('no-scroll');
  }
}


// Add event listeners for showing/hiding the dropdown
const headerCart_GoBtn = headerCart.querySelector('.js-go-to-checkout');
headerCartBtn.addEventListener('focus', blurDropdownCart);
headerCartBtn.addEventListener('blur', blurDropdownCart);
headerCartBtn.addEventListener('mouseleave', hideDropdownCart);
headerCart.addEventListener('mouseleave', hideDropdownCart);
headerCart.addEventListener('blur', hideDropdownCart, true);


/**
 * Hides the dropdown cart when focus is lost or an irrelevant interaction occurs.
 *
 * This function checks if the focus has moved outside the dropdown cart or if an irrelevant
 * action occurs (such as clicking outside specific cart-related buttons). If these conditions are met,
 * the dropdown cart is hidden by removing the `active` class from `headerCart` and the `no-scroll` class
 * from the `<body>` element. A small delay is introduced to account for focus shifts.
 *
 * @param {Event} e - The event object, typically triggered by a focus or click event.
 * @param {boolean} breakpoint - A condition indicating whether the current viewport satisfies
 *                                the breakpoint for showing the dropdown cart.
 *
 * @returns {void} - This function does not return a value; it directly updates the DOM.
 */
function blurDropdownCart(e, breakpoint) {
  setTimeout(() => {
    const isFocusInsideDropdown = headerCart.contains(document.activeElement);
    
    if (!isFocusInsideDropdown
        && breakpoint
        && !e.target.matches('.js-decrease, .js-increase, .js-remove-item')) {    
      headerCart.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  }, 50); // Small delay to account for focus shift
}


/**
 * Hides the dropdown cart when the mouse moves away or an irrelevant action occurs.
 *
 * This function checks if the mouse is no longer hovering over the dropdown cart (`headerCart`),
 * the cart button (`headerCartBtn`), or any specific cart-related buttons (such as decrease, 
 * increase, or remove item buttons). If these conditions are met, it hides the dropdown cart by:
 * - Removing the `active` class from `headerCart`.
 * - Removing the `no-scroll` class from the `<body>` element.
 *
 * A small delay is introduced to account for rapid mouse movements or hover transitions.
 *
 * @param {Event} e - The event object, typically triggered by a mouseleave or similar event.
 *
 * @returns {void} - This function does not return a value; it directly updates the DOM.
 */
function hideDropdownCart(e) {
  setTimeout(() => {
    if (!headerCart.matches(':hover') && 
        !headerCartBtn.matches(':hover') &&
        !e.target.matches('.js-decrease, .js-increase, .js-remove-item')) { 
      headerCart.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  }, 50); // Small delay to account for rapid mouse movements
}


/**
 * Handles the "close cart" action to transition back to the products section.
 *
 * This code listens for a `click` event on the `closeCart` button (or element).
 * When triggered, it performs the following actions:
 * - Displays the products section by removing the `hidden` class from `productsSection`.
 * - Hides the checkout section by adding the `hidden` class to `checkoutSection`.
 * - If the cart contains items (`cartSummaryObject.counter > 0`) and the products section is visible,
 *   it ensures that the "Go to Checkout" button (`headerGoToBtn`) is displayed by removing the `hidden` class.
 *
 * @returns {void} - This function does not return a value; it directly updates the DOM.
 */
const closeCart = document.querySelector('.cart__close');

closeCart.addEventListener('click', e => {
  productsSection.classList.remove('hidden');
  checkoutSection.classList.add('hidden');

  if (Number(cartSummaryObject.counter) > 0
      && !productsSection.classList.contains('hidden')) {
    headerGoToBtn.classList.remove('hidden');
  }
});


//*---------- Order Details Show/hide functionality ----------*//

const orderDetails = document.querySelector('.js-order-details');
const toggleOrderDetails = document.querySelector('.js-toggle-order-details');

toggleOrderDetails.addEventListener('click', (e) => {
  if (orderDetails.classList.contains('open')) {
    orderDetails.classList.remove('open')
    toggleOrderDetails.innerText = 'Visa detaljer';
  } else {
    orderDetails.classList.add('open');
    toggleOrderDetails.innerText = 'Dölj detaljer';
  }
});



//----------------------------------------------//
//---------- Cart Items functionality ----------//
//----------------------------------------------//


// Checkout: Cart items
const headerCartItems = document.querySelector('.js-header-cart-items');
const checkoutCartItems = document.querySelector('.js-checkout-cart-items');

headerCartItems.addEventListener('click', handleCartItemEvent);
headerCartItems.addEventListener('change', handleCartItemEvent);

checkoutCartItems.addEventListener('click', handleCartItemEvent);
checkoutCartItems.addEventListener('change', handleCartItemEvent);


function handleCartItemEvent(e) {
  
  const cartItemsContainer = e.target.closest('.js-cart-items'); // Find the DOM element
  const card = e.target.closest('.js-cart-item');
  const productId = Number(card.dataset.pid); // Extract productId from data-id
  const gender = card.dataset.gender; // Extract gender from data-gender
  const productData = productsObject[productId];
  const quantityValue = card.querySelector('.js-quantity');

  // Get [key, item] from cartObject
  const [key, itemData] = findKeyByProductIdAndGender(cartItemsObject, productId, gender) || [];
  
  // Click on increase or decrease buttons
  if (
    e.type === 'click' &&
    (e.target.matches('.js-increase') || 
    e.target.matches('.js-decrease'))
  ) {
    console.log(`\n//--- handleCartEvent('${e.type}') Called ---//`);

    const adjQty = adjustQuantity(e, card, itemData);
    const diff = adjQty[0];
    const newVal = adjQty[1];
    
    // Update values
    quantityValue.innerText = newVal;
    const newCount = sumValues(cartItemsObject, 'quantity') + diff;
    cartSummaryObject.counter = newCount;    
    const quantity = newVal; // set quantity and update item quantity
    const basePrice = Number(productData.priceInfo.price); // Original price set in productsObject
    const adjustedPrice = Number(weekendPricing(basePrice)); // 
    const discountPrice = Number(itemQtyDiscount(adjustedPrice, quantity));
    const discount = adjustedPrice - discountPrice;

    // Debugg
    
    
    // Update CartItem
    updateCartItem(itemData, quantity, discountPrice, discount);
    
    // Update cart summary
    updateCartSummary();
  
    // Update header cart values
    updateHeaderCartCounter(cartSummaryObject);

    console.log(`//--- handleCartEvent('${e.type}') End ---//`);
    
  }

  if (e.type === 'change' && e.target.matches('.js-quantity-cart')) {
    console.log('CHANGE!!!!');
    
    if (itemData && key) {
      const quantity = Number(e.target.innerText); // Get the new quantity

      // Update the cart object with the new quantity
      itemData.quantity = quantity;

      // Recalculate the item's price
      const basePrice = Number(productsObject[productId].priceInfo.price);
      const adjustedPrice = weekendPricing(basePrice);
      const discountPrice = itemQtyDiscount(adjustedPrice, quantity);
      const discount = adjustedPrice - discountPrice;

      // Update item data in cartItemsObject
      updateCartItem(itemData, quantity, discountPrice, discount);

      // Update cart summary
      updateCartSummary();

      // Update header cart counter
      updateHeaderCartCounter(cartSummaryObject);
    }
  }

  if (e.target.matches('.js-remove-item') && e.type == 'click' && key) {
    removeCartItem(e, productId, gender, key, cartItemsObject);

    // Update cart summary
    updateCartSummary();
  
    // Update header cart values
    updateHeaderCartCounter(cartSummaryObject);
  }

}
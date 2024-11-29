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
  getShippingCost
} from "./pricing.js";



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
              <input class="cart__item-quantity js-quantity" type="number" value="${itemData.quantity}" aria-label="Antal" disabled>
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


export function addCartItem(itemData, productData) {
  // Add Header Cart and Checkout Cart in an array
  const itemContainers = Array.from(document.querySelectorAll('.js-cart-items'));

  itemContainers.forEach(container => {
    container.innerHTML += cartItemCard(itemData, productData);
  });
}


export function updateCartItem(itemData, quantity, discountPrice, discount) {
  //console.log('updateCartItem Called');
  //console.log('itemData', itemData);
  
  // Get Element
  const cartItemsContainerArray = Array.from(document.querySelectorAll('.js-cart-items'));
  const productId = Number(itemData.productId);
  const gender = itemData.gender;

  // Update Item
  itemData.quantity = quantity;
  itemData.priceInfo.price = discountPrice;
  itemData.priceInfo.discount = discount * quantity;
  itemData.priceInfo.lineTotal = discountPrice * quantity
  
  // Update in both carts
  cartItemsContainerArray.forEach(container => {
    // Get item
    const item = container.querySelector(`.js-cart-item[data-pid="${productId}"][data-gender="${gender}"]`);
    
    // Get item elements
    const priceElem = item.querySelector('.js-price');
    const quantityElem = item.querySelector('.js-quantity');
    const itemLineTotalElem = item.querySelector('.js-item-line-total');

    // Update item price text
    if (priceElem) priceElem.innerText = formatPrice(discountPrice);
    // Update item quantity if needed
    if (quantityElem && Number(quantityElem.value) != Number(quantity)) quantityElem.value = quantity;
    // Update item line total
    if (itemLineTotalElem) itemLineTotalElem.innerText = `${formatPrice(discountPrice * quantity)} kr`;
  });

  //console.log('itemData', itemData);
  //console.log('updateCartItem END');
}



// Remove Item from Cart
export function removeCartItem(e, id, gender, cartKey, cartItemsObj) {
  //console.log('removeCartItem Called');

  const itemContainers = Array.from(document.querySelectorAll('.js-cart-items')); // Find all containers holding cart items
  const itemData = cartItemsObj[cartKey];
  
  if (cartKey && itemData) {
    //console.log('Before remove cartItemsObj', cartItemsObj);

    // Update cart counter  
    cartSummaryObject.counter -= itemData.quantity;
    
    // Delete the item from the cart items object
    delete cartItemsObj[cartKey];

    // Remove matching items from each container
    itemContainers.forEach(container => {
      //const item = container.querySelector(`.js-cart-item[data-pid="${id}"][data-gender="${gender}"]`);
      if (item) {
        item.remove(); // Remove the DOM element
        //console.log(`Removed item from container:`, item);
      }
    });
    //console.log('After remove cartObj', cartObj);
  } else {
    console.warn('Cart key or object not valid. No changes made.');
  }
}


// Update Cart Summary
export function updateCartSummary() {
  //console.log('updateCartSummary Called');
  const counter = cartSummaryObject.counter;
  
  // Get elements
  const cartSubtotal = document.querySelector('.js-cart-subtotal');
  const cartMondayDiscount = document.querySelector('.js-cart-monday-discount');
  const cartShipping = document.querySelector('.js-cart-shipping');
  const cartTotal = document.querySelector('.js-cart-total');
  
  // New subtotal
  const newSubtotal = mondayDiscount(sumValues(cartItemsObject, 'priceInfo.lineTotal'));
  const newDiscounts = sumValues(cartItemsObject, 'priceInfo.discount');
  
  // Update shipping cost
  const shippingCost = getShippingCost(newSubtotal, counter);
  
  //cartQtyDiscount(subtotal, counter, limit=15, discount=.9)
  // Set new values
  cartSummaryObject.subtotal = newSubtotal;
  cartSummaryObject.discounts = newDiscounts;
  cartSummaryObject.shippingCost = shippingCost
  cartSummaryObject.vat = newSubtotal * .2;
  cartSummaryObject.total = newSubtotal + shippingCost;

  // Hader and Checkout Cart Subtotal
  cartSubtotal.innerText = `${formatPrice(newSubtotal)} kr`;

  // if monday discount is applied show text
  if (mondayDiscount()) {
    cartMondayDiscount.innerText = 'Måndagsrabatt: 10 % på hela beställningen';
    cartMondayDiscount.classList.remove('hidden');
  }

  // Checkout Cart Shipping Cost
  cartShipping.innerText = `${formatPrice(shippingCost)} kr`;

  // Checkout Cart Total
  cartTotal.innerText = `${formatPrice(newSubtotal + shippingCost)} kr`;
}


// Update Header Cart Counter
export function updateHeaderCartCounter(cartObj) {
  // Log function call for debugging
  //console.log('updateHeaderCartCounter Called');
  
  // Get elements
  const productsSection = document.querySelector('.js-products-section');
  const headerCart = document.querySelector('.js-header-cart');
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

  // if (Number(cartObj.counter) > 0) {
  //   // Update counter and total text
  //   headerCount.innerText = `${cartObj.counter} st,`;
  //   headerTotal.innerText = `${formatPrice(Number(cartObj.subtotal))} kr`;

  //   // Show elements if the window width is greater than or equal to the breakpoint
  //   if (window.innerWidth >= breakpoint) {
  //     if (!productsSection.classList.contains('hidden')) {
  //       headerToCart.classList.remove('hidden');
  //     }
  //     headerTotal.classList.remove('hidden');
  //     headerCart.removeAttribute('disabled');
  //     headerCart.removeAttribute('aria-disabled');
  //   }
  // } else {
  //   // Reset counter and hide elements
  //   headerCount.innerText = '0';
  //   headerTotal.innerText = '';
  //   headerToCart.classList.add('hidden');
  //   headerTotal.classList.add('hidden');
  //   headerCart.setAttribute('disabled', "");
  //   headerCart.setAttribute('aria-disabled', "true");
  // }
}



//*---------- Cart Show/hide functionality ----------*//

// Get required element
const headerCartMobileBtn = document.querySelector('.js-header-cart-btn');
const headerCartBtn = document.querySelector('.js-header-cart');
const headerCart = document.querySelector('.js-dropdown-cart');
const goToCheckoutBtns = Array.from(document.querySelectorAll('.js-go-to-checkout'));
const headerGoToBtn = document.querySelector('.header__to-checkout');
const productsSection = document.querySelector('.js-products-section');
const checkoutSection = document.querySelector('.js-checkout-section');

// Set breakpoint true or false
const breakpoint = window.innerWidth > 720;

//* Go to checkout
// Header Mobile: Go to Checkout
headerCartMobileBtn.addEventListener('click', (e) => {
  productsSection.classList.add('hidden');
  checkoutSection.classList.remove('hidden');
});

// Header: Go to Checkout
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

// Function to toggle the dropdown
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

// Function to show the dropdown
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

// Function to blur the dropdown with a delay to allow focus to settle
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

// Function to hide the dropdown on mouse leave
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


// Checkout: Close
const closeCart = document.querySelector('.cart__close');

closeCart.addEventListener('click', e => {
  productsSection.classList.remove('hidden');
  checkoutSection.classList.add('hidden');

  if (Number(cartSummaryObject.counter) > 0
      && !productsSection.classList.contains('hidden')) {
    headerGoToBtn.classList.remove('hidden');
  }
});


//*---------- Cart Items functionality ----------*//

// Checkout: Cart items
const headerCartItems = document.querySelector('.header__cart-items');
const checkoutCartItems = document.querySelector('.cart__items');

headerCartItems.addEventListener('click', handleCartEvent);
// headerCartItems.addEventListener('keydown', handleCartEvent);
// headerCartItems.addEventListener('keyup', handleCartEvent);
// headerCartItems.addEventListener('change', handleCartEvent);

checkoutCartItems.addEventListener('click', handleCartEvent);
// checkoutCartItems.addEventListener('keydown', handleCartEvent);
// checkoutCartItems.addEventListener('keyup', handleCartEvent);
// checkoutCartItems.addEventListener('change', handleCartEvent);

function handleCartEvent(e) {
  //console.log('handleCartEvent Called on:', e.type);
  
  const cartItemsContainer = e.target.closest('.js-cart-items'); // Find the DOM element
  const card = e.target.closest('.js-cart-item');
  const products = productsObject;
  const productId = Number(card.dataset.pid); // Extract productId from data-id
  const gender = card.dataset.gender; // Extract gender from data-gender
  const productData = products[productId];
  const numberInput = card.querySelector('.js-quantity');
;
  // Get [key, item] from cartObject
  const [key, itemData] = findKeyByProductIdAndGender(cartItemsObject, productId, gender) || [];
    

  if (/*e.target.matches('.js-quantity') ||*/ 
      e.target.matches('.js-increase') || 
      e.target.matches('.js-decrease')) {
    
    const adjQty = adjustQuantity(e, card, itemData);
    const diff = adjQty[0];
    const newVal = adjQty[1];

    // Update values
    const newCount = sumValues(cartItemsObject, 'quantity') + diff;
    cartSummaryObject.counter = newCount;
    const quantity = newVal; // set quantity and update item quantity
    const basePrice = Number(productData.priceInfo.price); // Original price set in productsObject
    const adjustedPrice = Number(weekendPricing(basePrice)); // 
    const discountPrice = Number(itemQtyDiscount(adjustedPrice, quantity));
    const discount = adjustedPrice - discountPrice;
    
    // console.log('counter', counter);
    // console.log('quantity', quantity);
    // console.log('base price', basePrice);
    // console.log('adjusted price', adjustedPrice);
    // console.log('discounted price', discountPrice);
    // console.log('discount', discount);
    
    // Update CartItem
    updateCartItem(itemData, quantity, discountPrice, discount);
    
    // Update cart summary
    updateCartSummary();
  
    // Update header cart values
    updateHeaderCartCounter(cartSummaryObject);

  }

  if (e.target.matches('.js-remove-item') && e.type == 'click' && key) {
    console.log('Remove item');
    removeCartItem(e, productId, gender, key, cartItemsObject);

    // Update cart summary
    updateCartSummary();
  
    // Update header cart values
    updateHeaderCartCounter(cartSummaryObject);
  }

}
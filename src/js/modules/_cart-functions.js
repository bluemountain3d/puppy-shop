import { productsObject } from './_products-object.js';
import {
  formatPrice,
  formatPriceToNumber,
  adjustQuantity
} from './_utility-functions.js';
import {
  itemQtyDiscount,
  weekendPricing,
  calculateDiscount
} from './_discount-functions.js';


// * * * * * *
// * Objects * 
// * * * * * *

// cart object
export const cartObject = {
  counter: 0,
  cartSummary: {
    subtotal: 0,
    discounts: 0,
    vat: 0,
    shippingCost: 0,
    total: 0,
  },
};


// Shipping prices object
export const shippingCostObject = {
  stork: 250,
  dove: 150,
  hare: 75,
  snail: 25
};


// Gender translation object
export const genderTranslate = {
  male: 'Hane',
  female: 'Tik',
  Hane: 'male',
  Tik: 'female'
}




// * * * * * * *
// * Functions * 
// * * * * * * *

// Function to find an item by productId in cartObject
export function findItemByProductId(obj, pid) {
  const foundItem = Object.values(obj).find(item => {
    return item && item.pid === pid;
  });
  return foundItem;
}


// Function to find an item by productID and gender match in cartObject
export function findItemByProductIdAndGender(cartObject, productId, gender) {
  const foundItem = Object.values(cartObject).find(item => {
    return item && item.productId === productId && item.gender === gender;
  });
  return foundItem;
}

export function findKeyByProductIdAndGender(cartObj, productId, gender) {
  const entries = Object.entries(cartObj); // Get [key, value] pairs
  const foundEntry = entries.find(([key, item]) => {
    return item && item.productId === productId && item.gender === gender;
  });
  return foundEntry || []; // Always return an array, even if not found
}


// Function to get the highest index actual number in a object
export function getHighestIndex(obj) {
  // Get only numeric keys
  const numericKeys = Object.keys(obj)
    .map(key => parseInt(key, 10)) // Convert keys to integers
    .filter(key => !isNaN(key)); // Filter out non-numeric keys

  // Return the highest numeric key or -1 if there are no numeric keys
  return numericKeys.length > 0 ? Math.max(...numericKeys) : 1;
}


// Get Shipping Cost
export function getShippingCost(cartObj, costObj, varPercent = 1) {
  // Safely access subtotal from cartObj
  const subtotal = cartObj?.cartSummary?.subtotal ?? 0;
  // Get the selected radio button
  const shippingRadios = Array.from(document.querySelectorAll('input[name="shipping"]'));
  // Find the checked radio button
  const selectedRadio = shippingRadios.find(radio => radio.checked);
  // Calculate fixed and variable costs
  const fixedCost = selectedRadio ? costObj[selectedRadio.value] : 0;
  const variableCost = Number((cartObj?.cartSummary?.subtotal ?? 0) * varPercent / 100);
  // Return total cost
  return parseInt(fixedCost + variableCost, 10);
}


// Add to cart summary
export function addToCartSummary(quantity, originalPrice, discount) {
  //console.log('addToCartSummary called:');

  cartObject.cartSummary.subtotal += originalPrice * quantity;
  cartObject.cartSummary.discounts += discount * quantity;
  cartObject.cartSummary.vat = (cartObject.cartSummary.subtotal - cartObject.cartSummary.discounts) * .2;
  cartObject.cartSummary.total = cartObject.cartSummary.subtotal - cartObject.cartSummary.discounts + cartObject.cartSummary.shippingCost;
}


// Update Cart summary
export function updateCartSummary(card, itemObj, quantity, diff, currentPrice, discount) {
  console.log('updateCartSummary called:');

  if (card.classList.contains('js-product-card')) {
    //console.log('is product card');
    cartObject.cartSummary.subtotal += currentPrice * quantity;
    cartObject.cartSummary.discounts += discount * quantity;
    cartObject.cartSummary.vat = (cartObject.cartSummary.subtotal - cartObject.cartSummary.discounts) * .2;
    cartObject.cartSummary.total = cartObject.cartSummary.subtotal - cartObject.cartSummary.discounts;
    
  } else if (card.classList.contains('js-cart-item')) {
    //console.log('is product card');
    console.log('quantity', quantity);
    console.log('currentPrice', currentPrice);
    console.log('discount', discount);
    

    if (diff < 0) {
      // Subtract
      cartObject.cartSummary.subtotal -= currentPrice;
      cartObject.cartSummary.discounts -= discount;
    } 
    else if (diff > 0) {
      // Add
      cartObject.cartSummary.subtotal += currentPrice;
      cartObject.cartSummary.discounts += discount;
    }

    cartObject.cartSummary.vat = (cartObject.cartSummary.subtotal - cartObject.cartSummary.discounts) * .2;
    cartObject.cartSummary.total = cartObject.cartSummary.subtotal - cartObject.cartSummary.discounts;
  }
};


// Update Header Cart Counter
export function updateHeaderCartCounter(cartObj) {
  //console.log('updateHeaderCartCounter Called');
  
  // Get elements
  const headerToCart = document.querySelector('.header__to-checkout');
  const headerCount = document.querySelector('.header__cart-count');
  const headerTotal = document.querySelector('.header__cart-total');

  // Ensure elements exist
  if (!headerToCart || !headerCount || !headerTotal) {
    console.error('One or more header cart elements are missing.');
    return;
  }
  
  // Define breakpoint for responsive logic
  const breakpoint = 720;

  if (Number(cartObj.counter) > 0) {
    //console.log('Update counter and total text');
    //console.log('cartObj.counter', cartObj.counter);
    //console.log('formatPrice', formatPrice(Number(cartObj.cartSummary.total)));
    
    // Update counter and total text
    headerCount.innerText = `${cartObj.counter} st,`;
    headerTotal.innerText = `${formatPrice(Number(cartObj.cartSummary.total))} kr`;

    // Show elements if the window width is greater than or equal to the breakpoint
    if (window.innerWidth >= breakpoint) {
      headerToCart.classList.remove('hidden');
      headerTotal.classList.remove('hidden');
    }
  } else {
    // Reset counter and hide elements
    headerCount.innerText = '0';
    headerTotal.innerText = '';
    headerToCart.classList.add('hidden');
    headerTotal.classList.add('hidden');
  }
}


// get cart items as array
export function getCartItems(cartObj) {
  return Object.values(cartObj).slice(2);
}


// Add Item to cart
export function addCartItem(itemObj, productObj) {
  // Add Header Cart and Checkout Cart in an array
  const itemContainers = Array.from(document.querySelectorAll('.js-cart-items'));

  // Add item object to carts
  itemContainers.forEach(container => {
    container.innerHTML += `
      <li class="cart__item js-cart-item" data-pid="${itemObj.productId}" data-gender="${itemObj.gender}">
        <article class="cart__item-content-wrapper">
          <picture class="cart__item-image-wrapper">
            <img class="cart__item-image" src="${productObj.image.url}-w512.avif" alt="${productObj.image.alt}" width="80" height="80" loading="lazy">
          </picture>
          <section class="cart__item-info js-item-info">
            <h3 class="cart__item-title js-item-title">${productObj.breedInfo.breed}</h3>
            <span class="cart__item-gender js-gender">${itemObj.gender}</span>
            <span class="cart__item-price js-price">${formatPrice(itemObj.priceInfo.price)} kr</span>
            <div class="cart__item-controlls">
              <div class="cart__item-quantity-wrapper js-quantifier">
                <button class="cart__item-decrease js-decrease" aria-label="Minska antal">−</button>
                <input class="cart__item-quantity js-quantity" type="number" value="${itemObj.quantity}" aria-label="Antal">
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
          <span class="cart__item-line-total js-item-line-total">${formatPrice(itemObj.priceInfo.lineTotal)} kr</span>
        </div>
      </li>
    `;
  });
}


// Remove Item from Cart
export function removeCartItem(e, id, gender, cartKey, cartObj) {
  //console.log('removeCartItem Called');

  const itemContainers = Array.from(document.querySelectorAll('.js-cart-items')); // Find all containers holding cart items
  const itemObj = cartObj[cartKey];
  
  if (cartKey && itemObj) {
    //console.log('Before remove cartObj', cartObj);

    // Update cartObject
    cartObj.counter -= itemObj.quantity;
    cartObj.cartSummary.discounts -= itemObj.priceInfo.discount;
    cartObj.cartSummary.subtotal -= itemObj.priceInfo.lineTotal;
    cartObj.cartSummary.vat = (cartObj.cartSummary.subtotal - cartObj.cartSummary.discounts) * .2;
    cartObj.cartSummary.total = cartObj.cartSummary.subtotal - cartObj.cartSummary.discounts;

    updateHeaderCartCounter(cartObj);

    // Delete the item from the cart object
    delete cartObj[cartKey];

    // Remove matching items from each container
    itemContainers.forEach(container => {
      const item = container.querySelector(`.js-cart-item[data-pid="${id}"][data-gender="${gender}"]`);
      if (item) {
        item.remove(); // Remove the DOM element
        ////console.log(`Removed item from container:`, item);
      }
    });
    //console.log('After remove cartObj', cartObj);
  } else {
    console.warn('Cart key or object not valid. No changes made.');
  }
}


export function calculateQuantity(card, itemObj, cartObj) {
  console.log('calculateQuantity called');
  // Get quantity input element
  const numberInput = card.querySelector('.js-quantity');
  //console.log('numberInput', numberInput.value);

  // Ensure numberInput exists
  if (!numberInput) {
    console.error('Quantity input not found in card:', card);
    return 0;
  }

  // Convert input value to a number
  const quantity = Number(numberInput.value || 0);
  let diff = 0;
  //console.log('Quantity:', quantity);
  
  
  if (card.classList.contains('js-product-card')) {
    //console.log('is product card');
    // Add new quantity to existing item quantity
    itemObj.quantity += quantity;
    // Update cart counter
    cartObj.counter += quantity;

    // Return quantity
    return [quantity, diff];
  } else if (card.classList.contains('js-cart-item')) {
    console.log('is product card');
    // Calculate the difference between new and old quantity
    diff = Number(quantity) - Number(itemObj.quantity);
    // Update item quantity
    itemObj.quantity = quantity;
    
    // Update cart counter, ensuring it doesn't go below zero
    cartObj.counter = Math.max(cartObj.counter + diff, 0);

    // Return quantity
    return [quantity, diff];
  }
}


// Update Cart items
export function updateCartItems(card, itemContainers, itemObj) {
  console.log('updateCartItems Called');
  
  itemContainers.forEach(container => {
    const pid = card.dataset.pid;
    const gender = genderTranslate[card.dataset.gender];

    //console.log(pid, gender);
    
    const itemElem = container.querySelector(`.js-cart-item[data-pid="${pid}"][data-gender="${gender}"]`);

    if (!itemElem) return;

    const itemInput = itemElem.querySelector('.js-quantity');
    const itemPrice = itemElem.querySelector('.js-price');
    const itemLineTotal = itemElem.querySelector('.js-item-line-total');

    itemInput.value = Number(itemObj.quantity);
    itemPrice.innerText = `${formatPrice(Number(itemObj.priceInfo.price))} kr`;
    itemLineTotal.innerText = `${formatPrice(Number(itemObj.priceInfo.lineTotal))} kr`;

  });
}


// Update Cart Item object
export function updateCartObject(card, itemObj, cartObj) {
  console.log('updateCartObject Called');
  
  const itemContainers = Array.from(document.querySelectorAll('.js-cart-items'));
  const quantityCalc = calculateQuantity(card, itemObj, cartObj);
  const quantity = quantityCalc[0];
  const diff = quantityCalc[1];
  //console.log('quantity', quantity, 'diff', diff);
  
  //console.log('itemObj.quantity', itemObj.quantity);
  //console.log('itemObj.priceInfo.lineTotal', itemObj.priceInfo.lineTotal);

  // Update itemObj price and discount info
  const originalPrice = itemObj.priceInfo.price;
  const currentPrice = formatPriceToNumber(card.querySelector('.js-price').innerText);
  const discount = calculateDiscount(currentPrice, quantity, weekendPricing);

  // Update itemObj
  if (itemObj.quantity >= 10) {
    //console.log('Item discount:');
    
    const newCurrentPrice = weekendPricing(itemObj.priceInfo.price) * itemObj.quantity;
    itemObj.priceInfo.discount = newCurrentPrice - itemQtyDiscount(newCurrentPrice, itemObj.quantity);
  } else {
    //console.log('Item NO discount:');
    itemObj.priceInfo.discount += discount;
  }
  
  itemObj.priceInfo.lineTotal += (currentPrice * quantity);


  

  // Update cart summary
  updateCartSummary(card, itemObj, quantity, diff, currentPrice, discount);

  // Update Cart Items
  updateCartItems(card, itemContainers, itemObj);
  
  // Update header counter
  //updateHeaderCartCounter(cartObject);
  
}





// * * * * * * * * * * * * * * * * *
// * Cart Show/hide functionality  *
// * * * * * * * * * * * * * * * * *

const headerCartMobileBtn = document.querySelector('.js-header-cart-btn');
const headerCartBtn = document.querySelector('.js-header-cart');
const headerCart = document.querySelector('.js-dropdown-cart');
const goToCheckoutBtns = Array.from(document.querySelectorAll('.js-go-to-checkout'));
const headerGoToBtn = document.querySelector('.header__to-checkout');
const productsSection = document.querySelector('.js-products-section');
const checkoutSection = document.querySelector('.js-checkout-section');

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
  } else if (!productsSection.classList.contains('hidden')) {
    // Show the cart
    headerCart.classList.add('active');
    document.body.classList.add('no-scroll');
  }
}

// Function to show the dropdown
function showDropdownCart() {
  if (!productsSection.classList.contains('hidden') && cartObject.counter > 0) {
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
function blurDropdownCart(e) {
  setTimeout(() => {
    const isFocusInsideDropdown = headerCart.contains(document.activeElement);
    if (!isFocusInsideDropdown) {
      headerCart.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  }, 50); // Small delay to account for focus shift
}

// Function to hide the dropdown on mouse leave
function hideDropdownCart(e) {
  setTimeout(() => {
    if (!headerCart.matches(':hover') && 
      !headerCartBtn.matches(':hover')) { 
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

  if (Number(cartObject.counter) > 0) {
    headerGoToBtn.classList.remove('hidden');
  }
});




// * * * * * * * * * * * *
// *  Cart functionality *
// * * * * * * * * * * * *

// Checkout: Cart items
const headerCartItems = document.querySelector('.header__cart-items');
const checkoutCartItems = document.querySelector('.cart__items');

headerCartItems.addEventListener('click', handleCartEvent);
headerCartItems.addEventListener('keydown', handleCartEvent);
headerCartItems.addEventListener('keyup', handleCartEvent);
headerCartItems.addEventListener('change', handleCartEvent);

checkoutCartItems.addEventListener('click', handleCartEvent);
checkoutCartItems.addEventListener('keydown', handleCartEvent);
checkoutCartItems.addEventListener('keyup', handleCartEvent);
checkoutCartItems.addEventListener('change', handleCartEvent);

function handleCartEvent(e) {

  const cartItemsArray = getCartItems(cartObject);
  const cartItemsContainer = e.target.closest('.js-cart-items'); // Find the DOM element
  const card = e.target.closest('.js-cart-item');
  const products = productsObject;
  const productId = Number(card.dataset.pid); // Extract productId from data-id
  const gender = card.dataset.gender; // Extract gender from data-gender
  const productData = products[productId];

  // Get [key, item] from cartObject
  const [key, cartItem] = findKeyByProductIdAndGender(cartObject, productId, gender) || [];
    

  if (e.target.matches('.js-quantity') || 
      e.target.matches('.js-increase') || 
      e.target.matches('.js-decrease')) {
    
    adjustQuantity(e, card, cartItem);

    // Update Card Object
    updateCartObject(card, cartItem, cartObject);

    // Update cart object
    updateHeaderCartCounter(cartObject);
  }

  if (e.target.matches('.js-remove-item') && e.type == 'click' && key) {
    //console.log('Remove item');
    removeCartItem(e, productId, gender, key, cartObject);
  }

}



// TODO
/*
  # Update Cart Object on change in cart
  # Cart Subtotal
  # Cart Shipping Cost
  # 

*/

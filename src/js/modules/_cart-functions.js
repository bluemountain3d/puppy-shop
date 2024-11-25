import { productsObject } from './_products-object.js';
import {
  formatPrice 
} from './_utility-functions.js';


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


// Shipping prices
export const shippingCostObject = {
  stork: 250,
  dove: 150,
  hare: 75,
  snail: 25
};


// Function to find an item by productId in cartObject
export function findItemByProductId(cartObject, productId) {
  const foundItem = Object.values(cartObject).find(item => {
    return item && item.productId === productId;
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
export function addToCartSummary(originalPrice, discount) {
  cartObject.cartSummary.subtotal += originalPrice;
  cartObject.cartSummary.discounts += discount;
  cartObject.cartSummary.vat = (cartObject.cartSummary.subtotal - cartObject.cartSummary.discounts) * .2;
  cartObject.cartSummary.total = formatPrice(cartObject.cartSummary.subtotal - cartObject.cartSummary.discounts);
}









// * * * * * * * * * * * * * * * * *
// * Cart Show/hide functionality  *
// * * * * * * * * * * * * * * * * *

const headerCartMobileBtn = document.querySelector('.js-header-cart-btn');
const headerCartBtn = document.querySelector('.js-header-cart');
const headerCart = document.querySelector('.js-dropdown-cart');
const goToCheckoutBtns = Array.from(document.querySelectorAll('.js-go-to-checkout'));
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
  }
}

// Function to show the dropdown
function showDropdownCart() {
  if (!productsSection.classList.contains('hidden')) {
    headerCart.classList.add('active');
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
    }
  }, 50); // Small delay to account for focus shift
}

// Function to hide the dropdown on mouse leave
function hideDropdownCart(e) {
  setTimeout(() => {
    if (!headerCart.matches(':hover') && 
      !headerCartBtn.matches(':hover')) { 
      headerCart.classList.remove('active');
    }
  }, 50); // Small delay to account for rapid mouse movements
}


// Checkout: Close
const closeCart = document.querySelector('.cart__close');

closeCart.addEventListener('click', e => {
  productsSection.classList.remove('hidden');
  checkoutSection.classList.add('hidden');
});



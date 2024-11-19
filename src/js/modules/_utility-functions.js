import { 
  weekendPricing,
  itemQtyDiscount
} from './_discount-functions.js';



//* Utility Functions *//


// This function takes an array of text strings (textArray) and a CSS class name (className)
// It returns a string of HTML paragraphs with the given class, containing each text in the array
export function addTextFromArray(textArray, className) {
  return textArray.map(text => `<p class="${className}">${text}</p>`).join('');
}

// Formats a number with thousand delimiters
export function formatPrice(number, delimiter=' ') {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
}

// Format price string to number without delimiters
export function formatPriceToNumber(priceString) {
  // Remove spaces and non-numeric characters, then parse as a number
  return parseInt(priceString.replace(/\s|[^\d]/g, ''), 10);
}

// Function for calculate and format price per kg
export function comparisonPricePerKg(price, weight) {
  return formatPrice((weight > 0) ? (price / weight).toFixed(0) + ' kr/kg' : 'Ej tillgängligt');
}

// Function to find an item by productId in cartObject
export function findItemByProductId(cartObject, productId) {
  const foundItem = Object.values(cartObject).find(item => {
    return item && item.productId === productId;
  });
  return foundItem;
}

export function findItemByProductIdAndGender(cartObject, productId, gender) {
  const foundItem = Object.values(cartObject).find(item => {
    return item && item.productId === productId && item.gender === gender;
  });
  return foundItem;
}

export function getHighestIndex(obj) {
  // Get only numeric keys
  const numericKeys = Object.keys(obj)
    .map(key => parseInt(key, 10)) // Convert keys to integers
    .filter(key => !isNaN(key)); // Filter out non-numeric keys

  // Return the highest numeric key or -1 if there are no numeric keys
  return numericKeys.length > 0 ? Math.max(...numericKeys) : 1;
}



// Adjust Quantity
export function adjustQuantity(e, card, obj) {
  // Check if the clicked element is a button within the quantity group
  if (e.target.matches('.js-increase') || 
      e.target.matches('.js-decrease')) {
    // Get the input field within the closest quantity group
    const numberInput = e.target.closest('.js-quantifier').querySelector('.js-quantity');
    const currentValue = Number(numberInput.value);
  
    // Increase or decrease the value based on the button clicked
    if (e.target.matches('.js-increase')) {
      // Increase the value but ensure it does not go above 99
      numberInput.value = Math.min(99, currentValue + 1);
    }
    else if (e.target.matches('.js-decrease')) {
      // Decrease number and prevent value going below 0
      numberInput.value = Math.max(0, currentValue - 1);
    }

    updatePrice(card, obj);
  }
}


// Function to update pricing
export function updatePrice(card, obj) {
  const pricingElem = card.querySelector('.js-price');
  const quantity = card.querySelector('.js-quantity').value;
  let price  = obj.priceInfo.price;
  price = weekendPricing(price); // update with weekwn pricing
  price = itemQtyDiscount(price, quantity); // quantity discount
  pricingElem.innerText = formatPrice(price);
}
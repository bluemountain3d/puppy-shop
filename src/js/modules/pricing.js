import { cartItemsObject } from "./objects.js";

//*---------- Discounts ----------*//

/* Discount functions ToDo
 * Cart total discount. 10% if total amount is > 15
*/


/**
 * Add 15% on the price from friday 15:00 to monday 03:00
 * @param {*} price 
 * @param {*} change 
 * @returns 
 */
export function weekendPricing(price, change=1.15) {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  // Weekend is:
  // - Friday from 15:00 onwards
  // - All of Saturday
  // - All of Sunday
  // - Monday until 03:00
  if ((day === 5 && hour >= 15) || // Friday after 15:00
      (day === 6) || // All of Saturday
      (day === 0) || // All of Sunday
      (day === 2 && hour < 3)) {
    return parseInt(price * change, 10); // Monday before 03:00
  } else {
    return price;
  }
}


/**
 * 10% discount if quantity is X or more apply dicount
 * @param {*} price 
 * @param {*} quantity 
 * @param {*} amount 
 * @param {*} discount 
 * @returns 
 */
export function itemQtyDiscount(price, quantity, amount=10, discount=.9) {
  if (Number(quantity) >= amount) {
    return parseInt(price * discount, 10);
  } else {
    return price;
  }
}

/**
 * 
 * @param {*} price 
 * @param {*} quantity 
 * @param {*} weekendPricing 
 * @returns 
 */
export function calculateDiscount(price, quantity, weekendPricing) {
  const newCurrentPrice = weekendPricing(price) * quantity;
  if (quantity >= 10) {
    return newCurrentPrice - itemQtyDiscount(newCurrentPrice, quantity);
  } else {
    const currentPrice = itemQtyDiscount(price * quantity, quantity);
    return price * quantity - currentPrice;
  }
}



//*---------- Price manipulation ----------*//

/**
 * This function takes an array of text strings (textArray) and a CSS class name (className)
 * It returns a string of HTML paragraphs with the given class, containing each text in the array
 * @param {*} textArray 
 * @param {*} className 
 * @returns 
 */
export function addTextFromArray(textArray, className) {
  return textArray.map(text => `<p class="${className}">${text}</p>`).join('');
}


/**
 * Formats a number with thousand delimiters
 * @param {*} number 
 * @param {*} delimiter 
 * @returns 
 */
export function formatPrice(number, delimiter=' ') {
return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
}


/**
 * Format price string to number without delimiters
 * @param {*} priceString 
 * @returns 
 */
export function formatPriceToNumber(priceString) {
// Remove spaces and non-numeric characters, then parse as a number
return parseInt(priceString.replace(/\s|[^\d]/g, ''), 10);
}


/**
 * Function for calculate and format price per kg
 * @param {*} price 
 * @param {*} weight 
 * @returns 
 */
export function comparisonPricePerKg(price, weight) {
return formatPrice((weight > 0) ? (price / weight).toFixed(0) + ' kr/kg' : 'Ej tillgängligt');
}


/**
 * Update Comparison price
 * @param {*} card 
 * @param {*} obj 
 */
export function updateComparisonPrice(card, obj) {
  // Get selected gender
  const selectedGender = card.querySelector('.js-gender-rb:checked').value;
  // Get price
  const price = formatPriceToNumber(card.querySelector('.js-price').innerText);
  // Get the weight based on the selected gender
  const weight = obj.properties.weight[selectedGender];
  // Calculate the price per kg
  const pricePerKg = comparisonPricePerKg(price, weight);
  // Update the comparison price in the card
  const comparisonPriceElem = card.querySelector('.js-comparison-price');

  if (comparisonPriceElem) {
    comparisonPriceElem.textContent = `${pricePerKg}`;
  }
}


/**
 * Function to update pricing
 * @param {*} card 
 * @param {*} obj 
 * @returns 
 */
export function updatePrice(card, obj) {
  //console.log('up obj', obj);
  
  const priceElem = card.querySelector('.js-price');
  const origPriceElem = card.querySelector('.js-original-price');
  const comparisonPriceElem = card.querySelector('.js-comparison-price');
  const quantity = card.querySelector('.js-quantity').value; // from quantifier number input

  if (isNaN(quantity) || quantity < 0) {
    console.error('Invalid quantity');
    return;
  }

  const basePrice = obj.priceInfo.price;
  const adjustedPrice = weekendPricing(basePrice); // Check if weekend prices or not
  const discountPrice = itemQtyDiscount(adjustedPrice, quantity); // Check if item quantity discount is aplicable
  priceElem.innerText = formatPrice(discountPrice);

  if (origPriceElem) {
    if (adjustedPrice != discountPrice) {
      origPriceElem.innerText = `${formatPrice(adjustedPrice)} kr/st,`;
    } else {
      origPriceElem.innerText = '';
    }
  }

  if (comparisonPriceElem) {
    const gender = card.dataset.gender;
    comparisonPriceElem.innerText = comparisonPricePerKg(discountPrice, obj.properties.weight[gender]);
  }
}


// Get Shipping Cost
/**
 * 
 * @param {*} cartObj 
 * @param {*} costObj 
 * @param {*} varPercent 
 * @returns 
 */
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



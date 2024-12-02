import { cartItemsObject, cartSummaryObject, shippingCostObject } from "./objects.js";

//*---------- Discounts ----------*//

/**
 * Applies a discount to the subtotal if the current time qualifies for the Monday discount period.
 * The discount is available only on Mondays between 03:00 and 10:00.
 * 
 * @param {number} subtotal - The initial subtotal amount. Defaults to 0 if not provided.
 * @param {number} discount - The discount multiplier. Defaults to 0.9 (10% discount).
 * @returns {boolean|number} - 
 *   - Returns `true` if no subtotal is provided and the current time qualifies for the discount.
 *   - Returns `false` if no subtotal is provided and the current time does not qualify.
 *   - Returns the discounted subtotal if the current time qualifies.
 *   - Returns the original subtotal if the current time does not qualify.
 */
export function mondayDiscount(subtotal=0, discount=.9) {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (!subtotal) {
    if (day === 1 && hour > 3 && hour < 10) {
      return true;
    } else {
      return false;
    }
  };

  if (day === 1 && hour > 3 && hour < 10) {
    return Number(subtotal * discount);
  } else {
    return Number(subtotal);
  }
}


/**
 * Applies a price adjustment for weekend pricing or checks if the current time qualifies as a weekend pricing period.
 * Weekend pricing applies:
 * - Friday after 15:00
 * - All day Saturday
 * - All day Sunday
 * - Early hours of Tuesday (up to 03:00)
 * 
 * @param {number} price - The base price to apply the adjustment to. Defaults to 0 if not provided.
 * @param {number} change - The multiplier for the price adjustment during weekend pricing. Defaults to 1.15 (15% increase).
 * @returns {boolean|number} - 
 *   - Returns `true` if no price is provided and the current time qualifies as a weekend pricing period.
 *   - Returns `false` if no price is provided and the current time does not qualify.
 *   - Returns the adjusted price if a price is provided and the current time qualifies.
 *   - Returns the original price if a price is provided and the current time does not qualify.
 */
export function weekendPricing(price=0, change=1.15) {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  const isWeekend = (day === 5 && hour >= 15) || // Friday after 15:00
                    (day === 6) ||              // All of Saturday
                    (day === 0) ||              // All of Sunday
                    (day === 2 && hour < 3);    // Early hours of Tuesday

  // Return true/false only if no price is provided
  if (!price) {
    return isWeekend;
  }

  // Calculate weekend price adjustment
  return isWeekend ? price * change : price;
}


/**
 * Applies a discount to the item price if the purchased quantity meets or exceeds a specified threshold.
 * 
 * @param {number} price - The original price of the item.
 * @param {number} quantity - The quantity of the item being purchased.
 * @param {number} amount - The minimum quantity required to qualify for the discount. Defaults to 10.
 * @param {number} discount - The discount multiplier to apply to the price. Defaults to 0.9 (10% discount).
 * @returns {number} - 
 *   - Returns the discounted price if the quantity is greater than or equal to the specified threshold (`amount`).
 *   - Returns the original price if the quantity is below the threshold.
 */
export function itemQtyDiscount(price, quantity, amount=10, discount=.9) {
  if (Number(quantity) >= amount) {
    return parseInt(price * discount, 10);
  } else {
    return price;
  }
}


/**
 * Calculates the total discount applied to an order based on the price, quantity, 
 * and any applicable weekend or quantity-based discounts.
 * 
 * @param {number} price - The base price of a single item.
 * @param {number} quantity - The quantity of items being purchased.
 * @param {function} weekendPricing - A function that applies weekend pricing adjustments to the price.
 * @returns {number} - The total discount applied to the order.
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
 * Formats a numeric value into a price string with a specified delimiter for thousands.
 * Handles negative numbers by retaining the negative sign in the formatted output.
 * 
 * @param {number} number - The numeric value to format.
 * @param {string} delimiter - The character used to separate thousands. Defaults to a space (' ').
 * @returns {string} - The formatted price string with thousands separated by the specified delimiter.
 *   - If the number is negative, the formatted string will include a leading negative sign.
 */
export function formatPrice(number, delimiter = ' ') {
  const isNegative = number < 0; // Check if the number is negative
  const absoluteNumber = Math.abs(number); // Get the absolute value of the number
  const formattedNumber = absoluteNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
  return isNegative ? `-${formattedNumber}` : formattedNumber; // Add the negative sign if necessary
}


/**
 * Converts a formatted price string into a numeric value by removing non-numeric characters.
 * 
 * @param {string} priceString - The formatted price string to convert. 
 *   It may include thousands delimiters, spaces, or other non-numeric characters.
 * @returns {number} - The numeric value of the price.
 *   - Removes all spaces and non-numeric characters before conversion.
 *   - Returns an integer.
 */
export function formatPriceToNumber(priceString) {
  return parseInt(priceString.replace(/\s|[^\d]/g, ''), 10);
}


/**
 * Calculates and formats the price per kilogram based on the total price and weight.
 * 
 * @param {number} price - The total price of the item(s).
 * @param {number} weight - The total weight of the item(s) in kilograms.
 * @returns {string} - 
 *   - The formatted price per kilogram, with 'kr/kg' appended (e.g., "100 kr/kg").
 *   - Returns "Ej tillgängligt" if the weight is invalid (less than or equal to 0).
 */
export function comparisonPricePerKg(price, weight) {
  if (weight > 0) {
    const pricePerKg = (price / weight).toFixed(0); // Calculate price per kg
    return formatPrice(Number(pricePerKg)) + ' kr/kg'; // Format the number and append unit
  }
  return 'Ej tillgängligt'; // Return fallback for invalid weight
}


/**
 * Updates the comparison price per kilogram in a product card based on the selected gender and corresponding weight.
 * 
 * @param {HTMLElement} card - The product card element containing price and gender selection.
 * @param {Object} obj - The object containing weight properties for different genders.
 *   - Must have a `properties.weight` object with weights keyed by gender (e.g., `obj.properties.weight.male`).
 * 
 * @returns {void} - This function does not return anything. It directly updates the DOM element displaying the comparison price.
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
 * Updates the displayed price, original price, and comparison price per kilogram in a product card.
 * Handles adjustments for weekend pricing and quantity discounts based on the product's data.
 * 
 * @param {HTMLElement} card - The product card element containing price, quantity, and gender-related data.
 * @param {Object} obj - The product data object containing pricing and weight information.
 *   - Must include:
 *     - `obj.priceInfo.price`: The base price of the item.
 *     - `obj.properties.weight`: An object with weights keyed by gender (e.g., `obj.properties.weight.male`).
 * 
 * @returns {void} - This function does not return anything. It directly updates the DOM elements in the card.
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


/**
 * Calculates the shipping cost based on the selected shipping option, subtotal, and counter limit.
 * 
 * @param {number} subtotal - The order subtotal used to calculate the variable shipping cost.
 * @param {number} counter - A counter value used to determine if shipping is free.
 * @param {number} [limit=15] - The maximum counter value under which shipping is charged. Defaults to 15.
 * @returns {number} - 
 *   - Returns `0` if the counter is not provided or exceeds the limit (indicating free shipping).
 *   - Returns the sum of the fixed cost and a variable cost based on the subtotal for the selected shipping option.
 */
export function getShippingCost(subtotal, counter, limit=15) {
  //console.log('getShippingCost Called');
  
  // Get the selected radio button
  const shippingRadios = Array.from(document.querySelectorAll('input[name="shipping"]'));

  // Find the checked radio button
  const selectedRadio = shippingRadios.find(radio => radio.checked).value;

  // Calculate fixed and variable costs
  const fixedCost = Number(shippingCostObject[selectedRadio].fixed);
  const variableCost = subtotal / 100 * Number(shippingCostObject[selectedRadio].variable);

  // Return shipping cost
  if (!counter || counter > limit) {
    return 0;
  } else {
    return fixedCost + Math.round(variableCost);
  }
}


/**
 * Enables or disables a specified payment method based on the cart subtotal and a predefined limit.
 * Also updates the visibility of associated UI elements for specific payment methods.
 * 
 * @param {string} method - The payment method to check and update (e.g., 'invoice', 'card'). Defaults to 'invoice'.
 * @param {number} limit - The maximum allowed cart subtotal for the specified payment method. Defaults to 80,000.
 * @returns {void} - This function does not return anything. It updates the DOM directly.
 */
export function availablePaymentMethods(method = 'invoice', limit = 80000) {
  // Ensure cart summary object is valid
  if (!cartSummaryObject || typeof cartSummaryObject.subtotal !== 'number') {
    console.warn('Cart summary object is missing or invalid.');
    return;
  }

  // Get associated UI elements
  const cardInfo = document.querySelector('.js-card-info');
  const ssnGroup = document.querySelector('.js-ssn-group');

  // Get all payment method radio buttons
  const radios = Array.from(document.querySelectorAll('input[name="payment-method"]'));

  // Find the radio button for the specified method
  const targetRadio = radios.find(radio => radio.value === method);

  // If the target radio button exists, handle enabling/disabling based on the subtotal
  if (targetRadio) {
    if (cartSummaryObject.subtotal > limit) {
      // Disable the specified payment method
      targetRadio.setAttribute('disabled', '');
      targetRadio.checked = false; // Uncheck if it was selected
      radios[0].checked = true; // Check the first available payment method as a fallback

      // Update UI visibility for associated elements
      if (targetRadio.value === 'card') {
        cardInfo.classList.add('hidden'); // Hide card info
        ssnGroup.classList.remove('hidden'); // Show SSN group
      } else if (targetRadio.value === 'invoice') {
        cardInfo.classList.remove('hidden'); // Show card info
        ssnGroup.classList.add('hidden'); // Hide SSN group
      }
    } else {
      // Enable the specified payment method
      targetRadio.removeAttribute('disabled');
    }

    
  } else {
    // Warn if the specified payment method is not found
    console.warn(`Payment method "${method}" not found.`);
  }

}



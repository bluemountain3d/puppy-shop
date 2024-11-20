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

// Function to update pricing
export function updatePrice(card, obj) {
  const pricingElem = card.querySelector('.js-price');
  const quantity = card.querySelector('.js-quantity').value;

  if (isNaN(quantity) || quantity < 0) {
    console.error('Invalid quantity');
    return;
  }

  let basePrice = obj.priceInfo.price;
  let adjustedPrice = weekendPricing(basePrice); // Weekend pricing
  adjustedPrice = itemQtyDiscount(adjustedPrice, quantity); // Quantity discount

  pricingElem.innerText = formatPrice(adjustedPrice);
}


// * * * * * * * * * * * * * * * * * *
// * Funktions for handling Quantity *
// * * * * * * * * * * * * * * * * * *

export function adjustQuantity(e, card, obj) {
  const numberInput = e.target.closest('.js-quantifier').querySelector('.js-quantity');
  
  // Ensure numberInput exists
  if (!numberInput) return;

  // Check if the clicked element is a button within the quantity group
  if (e.target.matches('.js-increase') || e.target.matches('.js-decrease')) {
    const currentValue = Number(numberInput.value);
  
    // Increase or decrease the value based on the button clicked
    if (e.target.matches('.js-increase')) {
      numberInput.value = Math.min(99, currentValue + 1); // Ensure max value is 99
    }
    else if (e.target.matches('.js-decrease')) {
      numberInput.value = Math.max(0, currentValue - 1); // Ensure min value is 0
    }

    // Update the price immediately for button clicks
    updatePrice(card, obj);
  }

  // Handle manual input via the keyup event
  else if (e.target.matches('.js-quantity')) {
    //console.log('Event type:', e.type, 'Target:', e.target, 'Key:', e.key );
    
    let keyPressStartTime;
    if (e.key === 'Enter') {
      keyPressStartTime = Date.now();
    }

    if (['ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) {
      if (e.key === 'Enter') {
        const keyPressDuration = Date.now() - keyPressStartTime;
        if (keyPressDuration < 800) {
          //console.log('Enter key pressed and released within 2 seconds');
          const currentValue = Number(numberInput.value);
          if (currentValue > 99){
            numberInput.value = 99;
          }
          // Run your update logic for short press
          updatePrice(card, obj);
        } else {
          console.log('Enter key held for too long, action skipped');
        }
      } else {
        // Update price for ArrowUp and ArrowDown keys
        updatePrice(card, obj);
      }
    }
  }
}
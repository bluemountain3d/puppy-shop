import { cartObject } from '../modules/_cart-functions.js';
import { 
  weekendPricing,
  itemQtyDiscount
} from '../modules/_discount-functions.js';


// * * * * * * * * * * *
// * Utility functions *
// * * * * * * * * * * *

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

// Update Comparison price
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

// Function to update pricing
export function updatePrice(card, obj) {
  //console.log('up obj', obj);
  
  const priceElem = card.querySelector('.js-price');
  const origPriceElem = card.querySelector('.js-original-price');
  //const comparisonPriceElem = card.querySelector('.js-comparison-price');
  const itemLineTotalElem = card.querySelector('.js-item-line-total');
  const quantity = card.querySelector('.js-quantity').value; // from quantifier number input

  if (isNaN(quantity) || quantity < 0) {
    console.error('Invalid quantity');
    return;
  }

  const basePrice = obj.priceInfo.price;
  const adjustedPrice = weekendPricing(basePrice); // Weekend pricing
  const discountPrice = itemQtyDiscount(adjustedPrice, quantity); // Quantity discount
  priceElem.innerText = formatPrice(discountPrice);

  if (origPriceElem) {
    //const gender = card.dataset.gender;
    //comparisonPriceElem.innerText = comparisonPricePerKg(discountPrice, obj.properties.weight[gender]);
    if (adjustedPrice != discountPrice) {
      origPriceElem.innerText = `${formatPrice(adjustedPrice)} kr/st,`;
    } else {
      origPriceElem.innerText = '';
    }
  }

  if (itemLineTotalElem) {
    itemLineTotalElem.innerText = `${formatPrice(discountPrice * quantity)} kr`;
  }
}


// * * * * * * * * * * * * * * * * * * * *
// * Function for handling Quantitfiers  *
// * * * * * * * * * * * * * * * * * * * *

export function adjustQuantity(e, card, obj) {
  console.log('adjustQuantity Called');
  
  const numberInput = e.target.closest('.js-quantifier')?.querySelector('.js-quantity');
  if (!numberInput) return;

  const currentValue = Number(numberInput.value);
  let newValue;

  // Handle input via arrow keys
  if (e.type === 'keydown' && e.target.matches('.js-quantity')) {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      newValue = e.key === 'ArrowUp'
        ? Math.min(99, currentValue + 1)
        : Math.max(0, currentValue - 1);
      numberInput.value = newValue;
      updatePrice(card, obj);
    }
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default Enter behavior
      updatePrice(card, obj);
    }
  }

  if (e.type === 'click' && (e.target.matches('.js-increase') || e.target.matches('.js-decrease'))) {
    newValue = e.target.matches('.js-increase')
      ? Math.min(99, currentValue + 1)
      : Math.max(0, currentValue - 1);
    numberInput.value = newValue;
    updatePrice(card, obj);
  }

  // Handle manual input via the keyup event
  if (e.target.matches('.js-quantity')) {
    //console.log('Event type:', e.type, 'Target:', e.target, 'Key:', e.key );
    
    let keyPressStartTime;
    if (e.key === 'Enter') {
      keyPressStartTime = Date.now();
    }

    if (['ArrowUp', 'ArrowDown', 'Enter', 'Tab'].includes(e.key)) {
      if (e.key === 'Enter') {
        const keyPressDuration = Date.now() - keyPressStartTime;
        if (keyPressDuration < 800) {
          //console.log('Enter key pressed and released within 2 seconds');
          //const currentValue = Number(numberInput.value);
          if (currentValue > 99){
            numberInput.value = 99;
          } else if (currentValue < 0) {
            numberInput.value = 0;
          }
          // Run your update logic for short press
          updatePrice(card, obj);
        } else {
          console.log('Enter key held for too long, action skipped');
        }
      } else {
        // Update price for ArrowUp and ArrowDown keys
        if (currentValue > 99) {
          numberInput.value = 99;
        } else if (currentValue < 0) {
          numberInput.value = 0;
        }
        updatePrice(card, obj);
      }
    }
  }

  // if (card.classList.contains('js-card-item')) {
  //   console.log('udQty: is js-cadr-item');
    
  //   const diff = Number(newValue) - Number(currentValue);
  //   console.log('diff', diff);
    
  //   cartObject.counter += diff;
  //   console.log('udQty: cartObject.counter', cartObject.counter);
  // }

}
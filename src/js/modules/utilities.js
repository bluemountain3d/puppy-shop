// Object imports
import { cartItemsObject } from "./objects.js";

// Utilities import
import {
  updatePrice
} from "./pricing.js";



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
 * Shuffle order in array and returns new array
 * @param {*} array 
 * @returns 
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


/**
 * Handle Quantity buttons and input
 * @param {*} e 
 * @param {*} card 
 * @param {*} obj 
 * @returns 
 */
export function adjustQuantity(e, card, obj) {
  //console.log('adjustQuantity Called');
  // console.log('event type, key', e.type, e.key);
  // console.log('card ID', card.dataset.pid);
  
  //const numberInput = e.target.closest('.js-quantifier')?.querySelector('.js-quantity');
  const numberInput = card.querySelector('.js-quantity');
  if (!numberInput) return;

  const currentValue = Number(numberInput.value);
  //console.log('currentValue (quantity input)', currentValue);
  
  let newValue;

  // Handle input via arrow keys
  // if (e.type === 'keydown' && e.target.matches('.js-quantity')) {
  //   if (['ArrowUp', 'ArrowDown'].includes(e.key)) {

  //     newValue = e.key === 'ArrowUp'
  //       ? Math.min(99, currentValue + 1)
  //       : Math.max(0, currentValue - 1);
  //     console.log('newValue', newValue);
      
  //     numberInput.value = newValue;
  //     updatePrice(card, obj);
  //   }
  //   if (e.key === 'Enter') {
  //     console.log('Enter');

  //     e.preventDefault(); // Prevent default Enter behavior
  //     updatePrice(card, obj);
  //   }
  // }

  if (e.type === 'click' && (e.target.matches('.js-increase') || e.target.matches('.js-decrease'))) { 
    newValue = e.target.matches('.js-increase')
      ? Math.min(99, currentValue + 1)
      : Math.max(0, currentValue - 1);
    //console.log('newValue', newValue);

    numberInput.value = newValue;
    //console.log('numberInput.value', numberInput.value);

    updatePrice(card, obj);
  }

  // Handle manual input via the keyup event
  // if (e.target.matches('.js-quantity')) {
  //   //console.log('Event type:', e.type, 'Target:', e.target, 'Key:', e.key );
    
  //   let keyPressStartTime;
  //   if (e.key === 'Enter') {
  //     keyPressStartTime = Date.now();
  //   }

  //   if (['ArrowUp', 'ArrowDown', 'Enter', 'Tab'].includes(e.key)) {
  //     if (e.key === 'Enter') {
  //       const keyPressDuration = Date.now() - keyPressStartTime;
  //       if (keyPressDuration < 800) {
  //         //console.log('Enter key pressed and released within 2 seconds');
  //         //const currentValue = Number(numberInput.value);
  //         if (currentValue > 99){
  //           numberInput.value = 99;
  //         } else if (currentValue < 0) {
  //           numberInput.value = 0;
  //         }
  //         // Run your update logic for short press
  //         updatePrice(card, obj);
  //       } else {
  //         console.log('Enter key held for too long, action skipped');
  //       }
  //     } else {
  //       // Update price for ArrowUp and ArrowDown keys
  //       if (currentValue > 99) {
  //         numberInput.value = 99;
  //       } else if (currentValue < 0) {
  //         numberInput.value = 0;
  //       }
  //       updatePrice(card, obj);
  //     }
  //   }
  // }

  const diff = newValue - currentValue;
  
  return [diff, newValue];
}


/**
 * Function to find an item by productId in cartObject.
 * 
 * @param {*} obj 
 * @param {*} pid 
 * @returns 
 */
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
  return numericKeys.length > 0 ? Math.max(...numericKeys) : -1;
}

/**
 * Takes a object and a key 'keyName' or nested keys 'keyNameA.keyNameB'
 * and return the sum of all values.
 * @param {*} obj 
 * @param {*} sumValue 
 * @returns 
 */
export function sumValues(obj = {}, sumValue = '') {
  const objArray = Object.values(obj);

  // Helper function to access nested properties
  const getNestedValue = (item, sumValue) => {
    return sumValue.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : 0), item);
  };

  const output = objArray.reduce((sum, item) => sum + getNestedValue(item, sumValue), 0);
  
  return Number(output);
}


/**
 * A function to translate gender 
 * @param {*} gender 
 * @returns 
 */
export function translateGender(gender) {
  const genderTranslateObject = {
    male: 'Hane',
    female: 'Tik',
    Hane: 'male',
    Tik: 'female'
  }

  return genderTranslateObject[gender];
}
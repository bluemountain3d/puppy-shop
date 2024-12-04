// Object imports
import { cartItemsObject } from "./objects.js";

// Utilities import
import {
  updatePrice
} from "./pricing.js";



/**
 * Generates a string of HTML paragraphs from an array of text strings, applying a specified CSS class to each paragraph.
 *
 * @param {string[]} textArray - An array of text strings to be wrapped in paragraph tags.
 * @param {string} className - The CSS class name to be applied to each paragraph.
 * @returns {string} - A single string containing HTML for all paragraphs, with each string in the array wrapped in a 
 *                     `<p>` tag and the specified class applied.
 *
 * @example
 * const texts = ["Hello, world!", "This is a paragraph.", "Another text."];
 * const className = "my-class";
 * const html = addTextFromArray(texts, className);
 * console.log(html);
 * # Output:
 * # <p class="my-class">Hello, world!</p>
 * # <p class="my-class">This is a paragraph.</p>
 * # <p class="my-class">Another text.</p>
 */
export function addTextFromArray(textArray, className) {
  return textArray.map(text => `<p class="${className}">${text}</p>`).join('');
}


/**
 * Randomly shuffles the elements of an array using the Fisher-Yates algorithm and returns the shuffled array.
 *
 * @param {Array} array - The input array to be shuffled. This array will be modified in place.
 * @returns {Array} - The shuffled array with its elements in random order.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffledNumbers = shuffleArray(numbers);
 * console.log(shuffledNumbers); // Output: [3, 1, 4, 5, 2] (randomized order)
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
 * Adjusts the quantity of an item in a shopping cart based on user interaction and updates the price accordingly.
 *
 * This function handles quantity adjustments via click events on increment/decrement buttons
 * and returns the difference in quantity and the new quantity value. It also updates the price
 * of the associated item using the `updatePrice` function.
 *
 * @param {Event} e - The event object representing the user's interaction (e.g., click event).
 * @param {HTMLElement} card - The DOM element representing the item card that contains the quantity input.
 * @param {Object} obj - An object associated with the item, used for updating prices or other details.
 * @returns {[number, number]|undefined} - Returns an array containing:
 *                                          - `diff`: The change in quantity (positive, negative, or zero).
 *                                          - `newValue`: The updated quantity value.
 *                                        Returns `undefined` if no valid quantity input is found.
 */
export function adjustQuantity(e, card, obj) {

  console.log(`\n//--- adjustQuantity('${e.type}') Called ---//\n`);
  
  //const quantityValue = e.target.closest('.js-quantifier')?.querySelector('.js-quantity');
  const quantityValue = card.querySelector('.js-quantity');
  if (!quantityValue) return;

  const currentValue = Number(quantityValue.innerText);
  
  let newValue;

  if (
    e.type === 'click' && 
    (e.target.matches('.js-increase') || 
    e.target.matches('.js-decrease'))
  ) { 
    newValue = e.target.matches('.js-increase')
      ? Math.min(99, currentValue + 1)
      : Math.max(0, currentValue - 1);

    quantityValue.innerText = newValue;

    console.log(
      '// click decrease or increase button',
      '\n// currentValue', currentValue,
      '\n// newValue', newValue
    );
    
    updatePrice(card, obj);
  }

  const diff = newValue - currentValue;
  
  console.log(`//--- adjustQuantity('${e.type}') End ---//`);

  return [diff, newValue];
}


/**
 * Finds and returns an item from an object by matching a given product ID.
 *
 * This function searches through the values of the provided object to locate an item where the `pid` property matches
 * the given product ID (`pid`). It uses `Object.values` to access the object's values and `Array.prototype.find`
 * to locate the matching item.
 *
 * @param {Object} obj - The object containing items to search. Each value is expected to be an object with a `pid` property.
 * @param {string|number} pid - The product ID to search for.
 * @returns {Object|undefined} - Returns the found item object if a match is found, or `undefined` if no match exists.
 */
export function findItemByProductId(obj, pid) {
  const foundItem = Object.values(obj).find(item => {
    return item && item.pid === pid;
  });
  return foundItem;
}


/**
 * Finds and returns an item from a cart object by matching a given product ID and gender.
 *
 * This function searches through the values of the provided cart object to locate an item where the 
 * `productId` and `gender` properties match the specified values. It uses `Object.values` to access
 * the object's values and `Array.prototype.find` to locate the matching item.
 *
 * @param {Object} cartObject - The object containing items to search. Each value is expected to be an object 
 *                              with `productId` and `gender` properties.
 * @param {string|number} productId - The product ID to search for.
 * @param {string} gender - The gender to search for (e.g., "male", "female", "unisex").
 * @returns {Object|undefined} - Returns the found item object if a match is found, or `undefined` if no match exists.
 */
export function findItemByProductIdAndGender(cartObject, productId, gender) {
  const foundItem = Object.values(cartObject).find(item => {
    return item && item.productId === productId && item.gender === gender;
  });
  return foundItem;
}



/**
 * Finds and returns the key-value pair from a cart object where the item's `productId` and `gender` match
 * the specified values. If no match is found, an empty array is returned.
 *
 * @param {Object} cartObj - The object containing items to search. Each value is expected to be an object 
 *                           with `productId` and `gender` properties.
 * @param {string|number} productId - The product ID to search for.
 * @param {string} gender - The gender to search for (e.g., "male", "female", "unisex").
 * @returns {[string, Object]|[]} - Returns an array containing:
 *                                   - `key`: The key of the matching item.
 *                                   - `item`: The item object itself.
 *                                   Returns an empty array (`[]`) if no match is found.
 */
export function findKeyByProductIdAndGender(cartObj, productId, gender) {
  const entries = Object.entries(cartObj); // Get [key, value] pairs
  const foundEntry = entries.find(([key, item]) => {
    return item && item.productId === productId && item.gender === gender;
  });
  return foundEntry || []; // Always return an array, even if not found
}


/**
 * Finds and returns the highest numeric key from an object.
 *
 * This function extracts all numeric keys from the object, determines the highest value among them,
 * and returns it. If no numeric keys are found, it returns `-1`.
 *
 * @param {Object} obj - The object to search for numeric keys.
 * @returns {number} - The highest numeric key in the object. Returns `-1` if no numeric keys exist.
 */
export function getHighestIndex(obj) {
  // Get only numeric keys
  const numericKeys = Object.keys(obj)
    .map(key => parseInt(key, 10)) // Convert keys to integers
    .filter(key => !isNaN(key)); // Filter out non-numeric keys

  // Return the highest numeric key or -1 if there are no numeric keys
  return numericKeys.length > 0 ? Math.max(...numericKeys) : -1;
}



/**
 * Calculates the sum of values in an object, optionally accessing nested properties.
 *
 * This function iterates through the values of the provided object, extracts the specified property
 * (including nested properties) using a dot-separated string, and sums up all the values.
 *
 * @param {Object} obj - The object containing items to sum. Each value is expected to be an object or contain properties.
 * @param {string} sumValue - A dot-separated string representing the property to sum. For example, "price" or "details.amount".
 * @returns {number} - The sum of the specified property values across all items in the object. Returns `0` if the object is empty or the property does not exist.
 *
 * @example
 * const items = {
 *   item1: { price: 100 },
 *   item2: { price: 200 },
 *   item3: { price: 300 }
 * };
 * const total = sumValues(items, "price");
 * console.log(total); // Output: 600
 *
 * const nestedItems = {
 *   item1: { details: { amount: 50 } },
 *   item2: { details: { amount: 75 } },
 *   item3: { details: { amount: 25 } }
 * };
 * const nestedTotal = sumValues(nestedItems, "details.amount");
 * console.log(nestedTotal); // Output: 150
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
 * Translates a gender identifier between English and Swedish.
 *
 * This function converts a gender string from English ("male", "female") to Swedish ("Hane", "Tik")
 * and vice versa. It uses a predefined translation object to map the translations.
 *
 * @param {string} gender - The gender identifier to be translated. 
 *                          Expected values: "male", "female", "Hane", "Tik".
 * @returns {string|undefined} - The translated gender string, or `undefined` if the input does not match any key in the translation object.
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
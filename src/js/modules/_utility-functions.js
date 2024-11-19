//import { formatPrice } from './_discount-functions';



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
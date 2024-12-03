import { 
  productsObject, 
  cartSummaryObject, 
  cartItemsObject, 
  shippingCostObject
} from "./objects.js";

import {
  updateCartSummary,
  updateHeaderCartCounter
} from "./cart-functions.js";

import {
  startTimer,
  stopTimer
} from "./timers.js";


//--------------------------------------//
//---------- Objects & Arrays ----------//
//--------------------------------------//

// Patterns
export const regex = {
  email: /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/,
  zip: /^\d{3}\s?\d{2}$/,
  name: /^[a-zA-ZÀ-ž]{2,}[.' ]*[a-zA-ZÀ-ž.' ]*$/,
  street: /^[a-zA-ZÀ-ž][a-zA-ZÀ-ž0-9.,'\/\- ]*[a-zA-ZÀ-ž0-9.]$/,
  town: /^[a-zA-ZÀ-ž]{2,}(?:[.'\- ][a-zA-ZÀ-ž]*)*$/,
  entry: /^[0-9ABCD#*]{4,8}$/,
  mobile: /^(\+46\s?|0)(7[0236][\s\-1-9]?)(\s\d{2}|\d{3})(\s?\d{2}){2}$/,
  cardNumber: /^(\d{4})\s?(\d{4})\s?(\d{4})\s?(\d{4})$/,
  cardMM: /^(0[1-9]|1[0-2])$/,
  cardYY: /^\d{2}$/,
  cardCvv: /^\d{3}$/,
  cardOwner: /^[A-Za-zÅÄÖåäöÉéÈèÁá\s\-']+$/,
  socialSecutityNumber: /^\d{6}(-?\d{4})$|^\d{8}(-?\d{4})$/
}


// messages
const validation = {
  'postal-email': {
    regex: regex.email,
    shortLenth: 10,
    empty: 'Var god fyll i din e-postadress.',
    short: 'E-postadressen är för kort.',
    invalid: 'Du har angivit en ogiltig e-postadress.'
  },
  'postal-zip': {
    regex: regex.zip,
    shortLenth: 5,
    empty: 'Var god fyll i ditt postnummer.',
    short: 'Postnumret är för kort.',
    invalid: 'Du har angivit ett ogiltigt postnummer. Ange till exempel "123 45".'
  },
  'info-email': {
    regex: regex.email,
    shortLenth: 10,
    empty: 'Var god fyll i din e-postadress.',
    short: 'E-postadressen är för kort.',
    invalid: 'Du har angivit en ogiltig e-postadress.'
  },
  'info-zip': {
    regex: regex.zip,
    shortLenth: 5,
    empty: 'Var god fyll i ditt postnummer.',
    short: 'Postnumret är för kort.',
    invalid: 'Du har angivit ett ogiltigt postnummer. Ange till exempel "123 45".'
  },
  'given-name': {
    regex: regex.name,
    shortLenth: 2,
    empty: 'Var god fyll i ditt förnamn.',
    short: 'Förnamnet är för kort. Det måste innehålla minst två bokstäver.',
    invalid: 'Du har angivit otillåtna tecken i förnamnet.'
  },
  'family-name': {
    regex: regex.name,
    shortLenth: 2,
    empty: 'Var god fyll i ditt efternamn.',
    short: 'Efternamnet är för kort. Det måste innehålla minst två bokstäver.',
    invalid: 'Du har angivit otillåtna tecken i efternamnet.'
  },
  'street-address': {
    regex: regex.street,
    shortLenth: 4,
    empty: 'Var god fyll i din gatuadress.',
    short: 'Gatuadressen är för kort.',
    invalid: 'Du har angivit otillåtna tecken i gatuadressen.'
  },
  'town-city': {
    regex: regex.town,
    shortLenth: 2,
    empty: 'Var god fyll i din ort.',
    short: 'Ortsnamnet är för kort. Det måste innehålla minst två bokstäver.',
    invalid: 'Du har angivit otillåtna tecken i ortsnamnet.'
  },
  'entry-code': {
    regex: regex.entry,
    shortLenth: 4,
    empty: 'Var god fyll i en portkod om sådan krävs.',
    short: 'Portkoden är för kort.',
    invalid: 'Du har angivit en ogiltig portkod. Endast siffror, A–D, # eller * är tillåtna.'
  },
  'mobile-phone': {
    regex: regex.mobile,
    shortLenth: 10,
    empty: 'Var god fyll i ditt mobilnummer.',
    short: 'Mobilnumret är för kort.',
    invalid: 'Du har angivit ett ogiltigt mobilnummer. Ange till exempel "+46 70-123 45 67".'
  },
  'card-number': {
    regex: regex.cardNumber,
    shortLenth: 13,
    empty: 'Var god fyll i ditt kortnummer.',
    short: 'Kortnumret är för kort.',
    invalid: 'Du har angivit ett ogiltigt kortnummer.'
  },
  'card-expire-month': {
    regex: regex.cardMM,
    shortLenth: 2,
    empty: 'Var god fyll i giltighetsmånad.',
    short: 'Månadsnumret är för kort.',
    invalid: 'Du har angivit en ogiltig giltighetsmånad. Ange till exempel "01" för januari.'
  },
  'card-expire-year': {
    regex: regex.cardYY,
    shortLenth: 2,
    empty: 'Var god fyll i giltighetsår.',
    short: 'Årsnumret är för kort.',
    invalid: 'Du har angivit ett ogiltigt giltighetsår. Ange till exempel "25" för 2025.'
  },
  'card-cvv': {
    regex: regex.cardCvv,
    shortLenth: 3,
    empty: 'Var god fyll i din CVV-kod.',
    short: 'CVV-koden är för kort.',
    invalid: 'Du har angivit en ogiltig CVV-kod. CVV är ett tresiffrigt nummer.'
  },
  'card-owner': {
    regex: regex.cardOwner,
    shortLenth: 5,
    empty: 'Var god fyll i kortinnehavarens namn.',
    short: 'Namnet är för kort.',
    invalid: 'Du har angivit otillåtna tecken i namnet.'
  },
  'social-security-number': {
    shortLenth: 10,
    regex: regex.socialSecutityNumber,
    empty: 'Var god fyll i ditt personnummer.',
    short: 'Personnumret är för kort.',
    invalid: 'Du har angivit ett ogiltigt personnummer. Ange till exempel "19900101-1234".'
  }
};


//-------------------------------------------------//
//---------- Globals & Required elements ----------//
//-------------------------------------------------//

// Array with form field names
const checkoutFields = [
  'postal-email',
  'postal-zip',
  'info-email',
  'info-zip',
  'given-name',
  'family-name',
  'street-address',
  'town-city',
  'entry-code',
  'mobile-phone',
  'card-number',
  'card-expire-month',
  'card-expire-year',
  'card-cvv',
  'card-owner',
  'social-security-number'
];

// Sections & forms
const productsSection = document.querySelector('.js-products-section');
const checkoutSection = document.querySelector('.js-checkout-section');
const orderConfirmedSection = document.querySelector('.js-order-confirmed');
const checkoutForm = document.querySelector('.js-checkout-form');

// Checkout Intro related 
const postalEmail = document.querySelector('.js-postal-email');
const postalZip = document.querySelector('.js-postal-zip');
const checkoutContinue = document.querySelector('.js-checkout-continue-btn')

// Shipping
const shipping = document.querySelector('.js-shipping-selection');

// Your Info related
const yourInfo = document.querySelector('.js-your-information');
const infoField = document.querySelector('.js-your-info-field');
const infoInputs = Array.from(infoField.querySelectorAll('input:not(.js-entry-code)'));
const emailInput = document.querySelector('.js-email');
const zipInput = document.querySelector('.js-zip');
const givenNameInput = checkoutForm.querySelector('.js-given-name');
const familyNameInput = checkoutForm.querySelector('.js-family-name');
const streetAddressInput = checkoutForm.querySelector('.js-street-address');
const townInput = checkoutForm.querySelector('.js-town');
const phoneInput = checkoutForm.querySelector('.js-phone');

// Card related
const cardGroup = document.querySelector('.js-card-info');
const cardInputs = Array.from(cardGroup.querySelectorAll('input'));
const cardNumberInput = checkoutForm.querySelector('input[name="card-number"]');
const cardExpMonthInput = checkoutForm.querySelector('input[name="card-expire-month"]');
const cardExpYearInput = checkoutForm.querySelector('input[name="card-expire-year"]');
const cardCVVInput = checkoutForm.querySelector('input[name="card-cvv"]');
const cardOwnerInput = checkoutForm.querySelector('input[name="card-owner"]');

// Invoice related
const ssnGroup = document.querySelector('.js-ssn-group');
const ssnInput = ssnGroup.querySelector('input');

// GDPR
const gdprChb = document.querySelector('.js-gdpr-chb');

// Pay Button
const payBtn = document.querySelector('.js-pay-btn');



//-------------------------------//
//---------- Functions ----------//
//-------------------------------//

/**
 * Validates an input value against a given regular expression pattern.
 *
 * @param {string} value - The input value to be validated.
 * @param {RegExp} pattern - The regular expression pattern to test the input value against.
 * @returns {boolean} - Returns `true` if the `value` matches the `pattern`, otherwise `false`.
 */
export function isValid(value, pattern) {
  // console.log('isValid Called');

  return pattern.test(value);
}





/**
 * Validates all required fields in the checkout form.
 *
 * This function iterates through all fields marked with the `required` attribute
 * within the checkout form. It checks if each field meets its respective validation
 * criteria and displays error messages for invalid fields. Additionally, it handles
 * required checkboxes to ensure they are checked.
 *
 * @returns {boolean} - Returns `true` if all required fields are valid; otherwise, `false`.
 */
export function validateAllRequired(name) {
  //console.log('validateAllRequired Called');
  
  const requiredFields = checkoutForm.querySelectorAll('[required]');
  let allValid = true; // Assume all fields are valid initially

  requiredFields.forEach(field => {
    if (field.type !== 'checkbox') {
      const value = field.value.trim(); // Trim the input value
      const fieldName = field.name; // Get the name of the field
      const isValidField = value && isValid(value, validation[fieldName]?.regex); // Check both value presence and regex validity
      //console.log('field.name', field.name, isValidField);
      // If the field is invalid
      if (!isValidField) {
        if (name === 'checkout-pay-btn') {
          toggleMessage(field, fieldName, value); // Show error message
        }
        allValid = false; // Mark form as invalid
      }
    }

    if (field.type === 'checkbox') {
      // Check if the checkbox is required but not checked
      if (field.required && !field.checked) {
        if (name === 'checkout-pay-btn') {
          field.classList.add('invalid'); // Add invalid class for visual feedback
        }
        allValid = false; // Mark form as invalid
      } else if (field.required && field.checked) {
        field.classList.remove('invalid'); // Remove invalid class if checkbox is checked
      }
    }
  });

  return allValid; // Return overall form validity
}





/**
 * Retrieves a validation message based on the field name, input value, and validity.
 *
 * @param {string} name - The name of the field being validated. This is used to reference the corresponding validation rules and messages.
 * @param {string} value - The current value of the input field. Determines if the field is empty or meets validation criteria.
 * @param {boolean} valid - A flag indicating whether the value passes validation (`true` if valid, `false` if invalid).
 * @returns {string} - A validation message string that corresponds to the validation state:
 *                     - Returns the `empty` message if the value is empty.
 *                     - Returns the `short` message if the value is too short and invalid.
 *                     - Returns the `invalid` message if the value is invalid for other reasons.
 *                     - Returns `undefined` if no condition is met.
 */
export function getMessage(name, value, valid) {
  // console.log('getMessage Called'); 
  if (!value) {
    return validation[name].empty;
  }
  else if (!valid && value.length < validation[name].shortLenth) {
    return validation[name].short;
  }
  else if (!valid) {
    return validation[name].invalid;
  }
}





/**
 * Update invalid and valid states
 * This function adds or removes the `invalid` and `valid` classes 
 * for a given input element based on its validation state. 
 *
 * @param {HTMLElement} element - The input element to update.
 * @param {Boolean} isInvalid - Whether the input is invalid. 
 *                              If true, the `invalid` class is added, 
 *                              and the `valid` class is removed. 
 *                              If false, the `valid` class is added, 
 *                              and the `invalid` class is removed.
 */
function updateInvalidState(element, isInvalid) {
  // console.log('updateInvalidState Called');
  
  element.classList.toggle('invalid', isInvalid); // Add/remove "invalid" class
  element.classList.toggle('valid', !isInvalid); // Add/remove "valid" class
}





/**
 * Handles validation messages and input transformations for a given form input field.
 * 
 * This function determines whether an input is valid, displays error messages for invalid inputs,
 * and applies specific transformations to valid inputs (e.g., formatting phone numbers or card numbers).
 * It also manages the input's visual and accessibility states, such as adding/removing validation messages
 * and setting ARIA attributes.
 *
 * @param {HTMLElement} input - The input element to validate and update.
 * @param {string} name - The name attribute of the input field, used to determine validation rules and transformations.
 * @param {string} value - The current value of the input field, which will be validated and possibly transformed.
 * @returns {void}
*/
export function toggleMessage(input, name, value) {
  const valid = isValid(value, validation[name].regex); // Check if the input is valid
  const message = getMessage(name, value, valid); // Get appropriate validation message

  const wrapper = input.closest('.js-input-wrapper'); // Find the wrapper element
  const messageEl = wrapper.querySelector('.js-input-message'); // Find the message element

  // Special validation for card expiration dates
  if (valid && name === 'card-expire-year') {
    const expirationMessage = testCardDates(name);
    if (expirationMessage) {
      messageEl.textContent = expirationMessage;
      messageEl.classList.add('visible');
      updateInvalidState(input, true);
      input.setAttribute('aria-invalid', 'true');
      return; // Exit if there's an expiration date issue
    }
  }

  // Handle invalid input state
  if (!valid) {
    if (!messageEl.classList.contains('visible') || messageEl.textContent !== message) {
      messageEl.textContent = message;
      messageEl.classList.add('visible');
      updateInvalidState(input, true);
      messageEl.setAttribute('aria-live', 'polite');
      input.setAttribute('aria-invalid', 'true');
    }
    return; // Exit here to prevent further processing for invalid inputs
  }

  // If the input is valid, handle transformations and remove error state
  if (valid) {
    // Handle special cases based on the input name
    if (name === 'info-zip') {
      input.value = formatPostalCode(value);
      postalZip.value = input.value;
    } else if (name === 'info-email') {
      postalEmail.value = input.value;
    } else if (name === 'mobile-phone') {
      input.value = transformSwedishPhoneNumber(value);
    } else if (name === 'card-number') {
      //console.log('card-number');
      input.value = formatCardNumber(value); // Apply card number formatting
    }

    // Clear error message and update state
    messageEl.textContent = '';
    messageEl.classList.remove('visible');
    updateInvalidState(input, false);
    messageEl.removeAttribute('aria-live');
    input.removeAttribute('aria-invalid');
  }
}





/**
 * Formats a postal code by inserting a space between the first three digits and the last two digits.
 *
 * @param {string} postalCode - The postal code string to format.
 * @returns {string} - The formatted postal code with a space separating the first three digits from the last two.
 *                     If the postal code does not match the expected pattern, it remains unchanged.
 */
function formatPostalCode(postalCode) {
  // console.log('formatPostalCode Called');
  
  return postalCode.replace(/(\d{3})(\d{2})/, '$1 $2');
}





/**
 * Hides specific sections of the checkout process and resets required field attributes.
 *
 * This function is used to control the visibility of various elements in the checkout process by toggling 
 * classes and adjusting the "required" attribute on input fields.
 */
export function hideSections() {
  // console.log('hideSections Called');
  
  shipping.classList.add('hidden');
  yourInfo.classList.add('hidden');
  ssnGroup.classList.add('hidden');
  checkoutContinue.classList.remove('hidden');
  checkoutContinue.setAttribute('disabled','');
  cardGroup.classList.remove('hidden');
  payBtn.setAttribute('disabled','');

  // setRequired([postalEmail, postalZip], true);
  setRequired(infoInputs, false);
  setRequired(cardInputs, false);
  setRequired([ssnInput], false);
  setRequired([gdprChb], false);
};





/**
 * Set required inputs
 * Takes an array of inputs or a single input element
 * @param {Array|HTMLElement} inputs - The input(s) to modify
 * @param {Boolean} required - Whether the inputs should be required
 */
export function setRequired(inputs, required) {
  // console.log('setRequired Called');
  
  inputs.forEach(input => {
    if (required) {
      input.setAttribute('required', '');
      input.setAttribute('aria-required', 'true');
    } else {
      input.removeAttribute('required');
      input.removeAttribute('aria-required');
    }
  });
}





/**
 * Transforms a Swedish phone number into a standardized format.
 *
 * The function removes unnecessary characters, ensures the phone number starts with the international 
 * dialing code for Sweden (`+46`), and formats it into a readable structure.
 *
 * @param {string} phoneNumber - The input phone number string, which may include spaces,  
 *                               hyphens, or other non-numeric characters.
 * @returns {string} - A formatted Swedish phone number in the standard format: `+46 XX-XXX XX XX`.
 *                     If the input does not contain enough digits, the output might be incomplete.
 */
function transformSwedishPhoneNumber(phoneNumber) {
  // console.log('transformSwedishPhoneNumber Called');
  
  // Remove all whitespace and hyphens
  const cleanedNumber = phoneNumber.replace(/[\s\-]/g, '');
  
  // Ensure number starts with +46 or convert from 0
  let formattedNumber = cleanedNumber;
  if (formattedNumber.startsWith('0')) {
      formattedNumber = '+46' + formattedNumber.slice(1);
  } else if (!formattedNumber.startsWith('+46')) {
    formattedNumber = '+46' + formattedNumber;
  }
  
  // Format the number: +46 70-123 45 67
  const areaCode = formattedNumber.slice(3, 5);
  const subscriberPart1 = formattedNumber.slice(5, 8);
  const subscriberPart2 = formattedNumber.slice(8, 10);
  const subscriberPart3 = formattedNumber.slice(10, 12);

  return `+46 ${areaCode}-${subscriberPart1} ${subscriberPart2} ${subscriberPart3}`;
}





/**
 * Transforms a 16-digit number into the format "#### #### #### ####".
 *
 * This function takes a 16-digit number as input and converts it into a
 * string where groups of 4 digits are separated by spaces.
 *
 * @param {string|number} input - The 16-digit number to be transformed.
 * @returns {string} - The formatted string in the format "#### #### #### ####".
 */
function formatCardNumber(input) {
  //console.log('formatCardNumber Called');

  // Ensure the input is treated as a string
  const numberString = input.toString();

  // Validate the input length
  if (!/^\d{16}$/.test(numberString)) {
    throw new Error('Input must be a 16-digit number.');
  }

  // Format the number
  return numberString.replace(/(\d{4})(?=\d)/g, '$1 ');
}





/**
 * Validates the expiration date of a credit card.
 *
 * This function checks whether the provided credit card expiration date (month and year)
 * is valid and not expired based on the current date. It handles invalid or empty inputs
 * gracefully and returns an appropriate error message if the card is expired or the input is invalid.
 *
 * @param {string} name - The name attribute of the input field (not actively used in this function but passed for consistency).
 * 
 * @returns {string|undefined} - Returns a validation message if the card date is invalid or expired.
 *                               Returns `undefined` if the expiration date is valid.
 */
function testCardDates(name) {
  //console.log('testCardDates Called');

  const date = new Date();
  const month = Number(date.getMonth() + 1);
  const year = Number(date.getFullYear().toString().slice(-2));

  const cardMM = cardExpMonthInput.value ? Number(cardExpMonthInput.value) : null;
  const cardYY = cardExpYearInput.value ? Number(cardExpYearInput.value) : null;

  // Check for empty or invalid input
  if (cardMM === null || cardYY === null || isNaN(cardMM) || isNaN(cardYY)) {
    return 'Ange en giltigt år!';
  }

  // Check if card is expired
  if (cardYY < year || (cardYY === year && cardMM < month)) {
    return 'Giltighetstiden för kortet har gått ut!';
  }

  // Card is not expired
  return undefined;
}





//---------------------------------//
//---------- Order Timer ----------//
//---------------------------------//

// Define the timer duration
const checkoutDuration = 15 * 60 * 1000; // 15 minutes in miliseconds

// Defines what happens when the timer expires
function onCheckoutTimeout() {
  alert("Ooops! Du är visst långsammare än en torr snigel. Du tog för lång tid på dig att beställa, alla valpar han tyvärr ta slut. Så du blir utan, buhuuu buhuu.. Bättre lycka nästa gånng!!");
  productsSection.classList.remove('hidden');
  checkoutSection.classList.add('hidden');
  orderConfirmedSection.classList.add('hidden');
  document.querySelectorAll("form").forEach(form => form.reset());
  location.reload();
}

// Start the checkout timer
startTimer('checkout', checkoutDuration, onCheckoutTimeout);



//----------------------------------------//
//---------- Form Event Handler ----------//
//----------------------------------------//

// Validation Handler
let validationTimeout; // Declare timeout variable

function handleValidation(e) {
  // console.log('handleValidation Called');  

  clearTimeout(validationTimeout); // Clear any previous timeout
  validationTimeout = setTimeout(() => {

    // Actual validation logic here
    const type = e.type;
    const target = e.target;
    const name = e.target.name;
    const value = e.target.value;
    // console.log('const type = ',type);
    // console.log('const target = ',target);
    // console.log('const name = ',name);
    // console.log('const value = ',value);

    
  
    //------------------------------------//
    //---------- Update pricing ----------//
    //------------------------------------//

    if (name === 'shipping') {
      updateCartSummary();
    }


    //------------------------------------//
    //------- Update Payment Method ------//
    //------------------------------------//

    if (name === 'payment-method') {
      if (value === 'card') {
        cardGroup.classList.remove('hidden');
        ssnGroup.classList.add('hidden');
        setRequired(cardInputs, true);
        setRequired([ssnInput], false);
      } else if (value === 'invoice') {        
        cardGroup.classList.add('hidden');
        ssnGroup.classList.remove('hidden');
        setRequired(cardInputs, false);
        setRequired([ssnInput], true);
      }
    }


    //------------------------------------//
    //------------- On Change ------------//
    //------------------------------------//

    if (type === 'change') {
      //console.log('Change, name:',name);
      
      // Validate all inputs to enable pay button
      if ((name !== 'postal-email' || name !== 'postal-zip') && target.type !== 'radio' ) {
        if (validateAllRequired(name)) {
          // If all required fields are valid, enable the "Pay" button
          payBtn.removeAttribute('disabled');
        } else {
          // If any required field is invalid, disable the "Pay" button
          payBtn.setAttribute('disabled', '')
        }
      }
      
      // Validate fields on change
      if (checkoutFields.includes(name)) {
        //console.log('checkoutFields.includes(name)', checkoutFields.includes(name));
        
        toggleMessage(target, name, value); // Toggle message
      }

      // Copy values from postal to info
      if (
        (name === 'postal-email' || name === 'postal-zip') &&
        isValid(postalEmail.value, validation['postal-email'].regex) &&
        isValid(postalZip.value, validation['postal-zip'].regex)
      ) {
        //checkoutContinue.removeAttribute('disabled');
        postalZip.value = formatPostalCode(postalZip.value);
        emailInput.value = postalEmail.value;
        zipInput.value = postalZip.value;
      }

      // Handle messages for name fields
      if (name === 'given-name' && 
          familyNameInput.value &&
          isValid(value, validation[name].regex)
      ) {
        toggleMessage(familyNameInput, 'family-name', familyNameInput.value);
      }

      // Handle GDPR checkbox
      if (name === 'gdpr') {
        gdprChb.classList.toggle('valid', gdprChb.checked);
        gdprChb.classList.toggle('invalid', !gdprChb.checked);
      }
    }


    //------------------------------------//
    //------------- On input -------------//
    //------------------------------------//

    if (type === 'input') {
      //console.log('inpuy, name:', name);
      
      // Postal Email
      if (
        name === 'postal-email' && 
        !isValid(value, regex.email)
      ) {
        // Hide Shipping and Info
        hideSections();
      }

      // Postal Zip
      if (
        name === 'postal-zip' && 
        !isValid(value, regex.zip)
      ) {
        // Hide Shipping and Info
        hideSections();
      } 

      if (
        (name === 'postal-email' || name === 'postal-zip') &&
        isValid(postalEmail.value, validation['postal-email'].regex) &&
        isValid(postalZip.value, validation['postal-zip'].regex)
      ) {
        checkoutContinue.removeAttribute('disabled');
      }

      // Card MM || Card YY || Card CVV
      if (
        (name === 'card-expire-month' /*|| name === 'card-expire-year'*/) &&
        isValid(value, validation[name].regex)
      ) {
        // Get index of validated input
        const curIndex = cardInputs.indexOf(target)

        if (curIndex >= 0 && curIndex < cardInputs.length - 1) {
          cardInputs[curIndex + 1].focus() // Move focus to the next input
        }
      }
    }


    //------------------------------------//
    //------------- On Click -------------//
    //------------------------------------//

    if (type === 'click') {
      //console.log('Click, name:', name);

      e.preventDefault();

      const cartNotEmpty = Object.keys(cartItemsObject).length > 0;
      
      // Continue to shipping and info
      if (
        name === 'checkout-continue-btn' &&
        isValid(postalEmail.value, regex.email) &&
        isValid(postalZip.value, regex.zip) &&
        cartNotEmpty
      ) {
        shipping.classList.remove('hidden');
        yourInfo.classList.remove('hidden');
        checkoutContinue.classList.add('hidden');

        const cardRb = document.querySelector('input[name="payment-method"][value="card"]');
        
        if (cardRb) cardRb.checked = true;
        // setRequired([postalEmail, postalZip], false);
        setRequired(infoInputs, true);
        setRequired(cardInputs, true);
        setRequired([ssnInput], false);
        setRequired([gdprChb], true);
      }


      // Reset form
      else if (name === 'reset-form-btn') {
        const itemContainers = Array.from(document.querySelectorAll('.js-cart-items')); // Find all containers holding cart items
        const summaryItemContainers = Array.from(document.querySelectorAll('.js-summary-items')); // Find all containers holding summary items
        
        hideSections();
        checkoutForm.reset();

        itemContainers.forEach(container => {
          container.innerHTML = '';
        });

        summaryItemContainers.forEach(container => {
          container.innerHTML = '';
        });

        for (let key in cartItemsObject) {
          if (cartItemsObject.hasOwnProperty(key)) {
            delete cartItemsObject[key]; // Remove each property
          }
        }

        cartSummaryObject.counter = 0;

        updateCartSummary();
        updateHeaderCartCounter(cartSummaryObject);
      }


      // Hide Checkout and show order resume
      else if (name === 'checkout-pay-btn') {
        // If all required inputs are valid
        if (validateAllRequired(name) && cartNotEmpty) {
          // console.log('ALL VALID:', allValid);
          // Proceed with payment
  
          stopTimer('checkout'); // Stop the timer if all fields are valid

          // Set checkout data
          const sumNameElem = document.querySelector('.js-summary-name');
          const sumStreetAddressElem = document.querySelector('.js-summary-street-address');
          const sumZipElem = document.querySelector('.js-summary-zip');
          const sumTownElem = document.querySelector('.js-summary-town');
          const sumPhoneElem = document.querySelector('.js-summary-phone');
          const sumEmailElem = document.querySelector('.js-summary-email');


          sumNameElem.innerText = `${givenNameInput.value} ${familyNameInput.value}`;
          sumStreetAddressElem.innerText = streetAddressInput.value;
          sumZipElem.innerText = zipInput.value;
          sumTownElem.innerText = townInput.value;
          sumPhoneElem.innerText = phoneInput.value;
          sumEmailElem.innerText = emailInput.value;

          // Hide Checkout
          checkoutSection.classList.add('hidden');
          // Show Order Confirmed
          orderConfirmedSection.classList.remove('hidden');
          // Reset form
          checkoutForm.reset();
        } else {
          console.warn('Some required fields are invalid.');
        }
      }
    }

    

  }, 50); // 50ms debounce
}


//---------------------------------------//
//--------- Order confirmation ----------//
//---------------------------------------//

const orderConfirmCloseBtn = document.querySelector('.js-summary-close-btn');
orderConfirmCloseBtn.addEventListener('click', (e) => {
  productsSection.classList.remove('hidden');
  orderConfirmedSection.classList.add('hidden');
  location.reload();
});


//------------------------------------//
//--------- Init Validation ----------//
//------------------------------------//

export const initFormValidation = (() => {

  checkoutForm.addEventListener('change', handleValidation);
  checkoutForm.addEventListener('input', handleValidation);
  checkoutForm.addEventListener('click', handleValidation);
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting
  });

})();







//--------------------------------------//
//---------- Work In Progress ----------//
//--------------------------------------//


function validateSSN (
  a, // social security number
  b, // placeholder
  c, // --||--
  d  // --||--
  ) {
  c='';
  // we're only interested in the first 10 chars (9 digits)
  // using a second index to skip the dash while still maintaining
  // an index to check for even/odd
  for(b=d=0;b<10;b++)
      c+=b!=6              // if we're not on the dash
          ?a[b]*(d++%2||2) // multiply the value with 2 if needed
          :'';             // skip the dash
  b=0; // reset the index to use as a sum

  // sum all the digits
  for(d in c)
      b+=c[d]*1;

  // multiply the sum by 9 and check if the last digit of the checksum
  // matches the last digit of the input
  return b*9%10==a[10]
}



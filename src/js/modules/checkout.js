import { 
  productsObject, 
  cartSummaryObject, 
  cartItemsObject, 
  shippingCostObject
} from "./objects.js";

import {
  updateCartSummary
} from "./cart-functions.js";

import {
  startTimer,
  stopTimer
} from "./timers.js";


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


// Globals
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

// Elements
const productsSection = document.querySelector('.js-products-section');
const checkoutSection = document.querySelector('.js-checkout-section');
const orderConfirmedSection = document.querySelector('.js-order-confirmed');
const checkoutForm = document.querySelector('.js-checkout-form');
const postalEmail = document.querySelector('.js-postal-email');
const postalZip = document.querySelector('.js-postal-zip');
const checkoutContinue = document.querySelector('.js-checkout-continue-btn')

const shipping = document.querySelector('.js-shipping-selection');

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

const cardGroup = document.querySelector('.js-card-info');
const cardInputs = cardGroup.querySelectorAll('input');
const ssnGroup = document.querySelector('.js-ssn-group');
const ssnInput = ssnGroup.querySelector('input');

const gdprChb = document.querySelector('.js-gdpr-chb');


/**
 * Validates an input value against a given regular expression pattern.
 *
 * @param {string} value - The input value to be validated.
 * @param {RegExp} pattern - The regular expression pattern to test the input value against.
 * @returns {boolean} - Returns `true` if the `value` matches the `pattern`, otherwise `false`.
 */
export function isValid(value, pattern) {
  return pattern.test(value);
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
  element.classList.toggle('invalid', isInvalid); // Add/remove "invalid" class
  element.classList.toggle('valid', !isInvalid); // Add/remove "valid" class
}


/**
 * Toggle error or success messages for input fields
 * This function handles the display of validation messages for input fields
 * and updates their `invalid` or `valid` state accordingly.
 *
 * @param {HTMLElement} input - The input element being validated.
 * @param {String} name - The name of the input field (used to retrieve validation patterns and messages).
 * @param {String} value - The current value of the input field.
 */
export function toggleMessage(input, name, value) {
  console.log('toggleMessage Called');
  
  // Store valid state
  const valid = isValid(value, validation[name].regex);
  // Get message
  const message = getMessage(name, value, valid);
  // Get elements
  const wrapper = input.closest('.js-input-wrapper');
  const messageEl = wrapper.querySelector('.js-input-message');

  if (!valid && (!messageEl.classList.contains('visible') || messageEl.textContent !== message)) {
    console.log('Invalid', input.name);
    
    messageEl.textContent = message;
    messageEl.classList.add('visible');
    updateInvalidState(input, true); // If the input is not valid, the invalid class is added
    messageEl.setAttribute('aria-live', 'polite');
    input.setAttribute('aria-invalid', 'true');
  } else if (valid && (messageEl.classList.contains('visible') || messageEl.textContent !== '')) {
    console.log('Valid', input.name);

    // Transform value
    // Zip
    if (name === 'info-zip') {
      input.value = formatPostalCode(value);
      postalZip.value = input.value;
    }
    // Mobile phone
    else if (name === 'mobile-phone') {
      console.log('MOBILE PHONE');
      input.value = transformSwedishPhoneNumber(value);
    }
    
    messageEl.textContent = '';
    messageEl.classList.remove('visible');
    updateInvalidState(input, false); // The input is valid, so the "invalid" state should be removed
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
  return postalCode.replace(/(\d{3})(\d{2})/, '$1 $2');
}


/**
 * Hides specific sections of the checkout process and resets required field attributes.
 *
 * This function is used to control the visibility of various elements in the checkout process by toggling 
 * classes and adjusting the "required" attribute on input fields.
 */
function hideSections() {
  shipping.classList.add('hidden');
  yourInfo.classList.add('hidden');
  ssnGroup.classList.add('hidden');
  checkoutContinue.classList.remove('hidden');
  cardGroup.classList.remove('hidden');

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
function setRequired(inputs, required) {
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





//---------------------------------//
//---------- Order Timer ----------//
//---------------------------------//

// Define the timer duration
const checkoutDuration = 15 * 60 * 1000; // 15 minutes in miliseconds

// Defines what happens when the timer expires
function onCheckoutTimeout() {
  alert("Ooops! Du är visst långsammare än en torr snigel. Du tog för lång tid på dig att beställa, alla valpar han tyvärr ta slut, buhuu.. Bättre lycka nästa gånng!!");
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

  clearTimeout(validationTimeout); // Clear any previous timeout
  validationTimeout = setTimeout(() => {

    // Actual validation logic here
    const type = e.type;
    const target = e.target;
    const name = e.target.name;
    const value = e.target.value;

    //console.log('Type:', type, ', Input:', name, ', Value:', value);

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
      console.log('type, target:', type, name);

      // Validate fields on change
      if (checkoutFields.includes(name)) {
        console.log('checkoutFields Includes:', name);
        toggleMessage(target, name, value); // Toggle message
      }

      // Copy values from postal to info
      if (
        (name === 'postal-email' || name === 'postal-zip') &&
        isValid(postalEmail.value, validation['postal-email'].regex) &&
        isValid(postalZip.value, validation['postal-zip'].regex)
      ) {
        postalZip.value = formatPostalCode(postalZip.value);
        emailInput.value = postalEmail.value;
        zipInput.value = postalZip.value;
      }

      if (name === 'gdpr') {
        gdprChb.classList.toggle('valid', gdprChb.checked);
        gdprChb.classList.toggle('invalid', !gdprChb.checked);
      }
    }

    //------------------------------------//
    //------------- On Click -------------//
    //------------------------------------//

    if (type === 'click') {
      //console.log('type, target', type, name);
      e.preventDefault();

      // Continue to shipping and info
      if (
        name === 'checkout-continue-btn' &&
        isValid(postalEmail.value, regex.email) &&
        isValid(postalZip.value, regex.zip) &&
        cartItemsObject
      ) {
        shipping.classList.remove('hidden');
        yourInfo.classList.remove('hidden');
        checkoutContinue.classList.add('hidden');

        const cardRb = document.querySelector('input[name="payment-method"][value="card"]');
        if (cardRb) cardRb.checked = true;

        setRequired(infoInputs, true);
        setRequired(cardInputs, true);
        setRequired([ssnInput], false);
        setRequired([gdprChb], true);
      }

      // Hide Checkout and show order resume
      else if (name === 'checkout-pay-btn') {
        const requiredFields = checkoutForm.querySelectorAll('[required]');
        let allValid = true;

        requiredFields.forEach(field => {
          //console.log('forEach fi.nameeld:', field.name);
          
          if (field.type != 'checkbox') { // || !field.closest('fieldset').classList.contains('hidden')
            //console.log('input not CHB', field.name);
            
            const value = field.value.trim();
            const name = field.name;
            const isValidField = isValid(value, validation[name].regex);
        
            if (!isValidField) {
              toggleMessage(field, name, value); // Show error message if invalid
              allValid = false;
            }
          }

          if (field.type === 'checkbox') {
            console.log('input is CHB', field.name);

            // Validate required checkboxes are checked
            if (field.required && !field.checked) {
              // Optional: Add visual feedback or error message
              field.classList.add('invalid');
              
              // You might want to create a specific toggle message for checkboxes
              //toggleMessage(field, field.name, 'checkbox');
              
              allValid = false;
            } else if (field.required && field.checked) {
              field.classList.remove('invalid');
            }
          }
          
        });
      
        if (allValid) {
          // Proceed with payment
          //console.log('All fields are valid. Proceeding with payment...');
          
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
          console.log('Some required fields are invalid.');
        }
      }

    }

    //------------------------------------//
    //------------- On input -------------//
    //------------------------------------//

    if (type === 'input') {
      //console.log('type, target', type, name);
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
    }

    //console.log('Validating form for event:', e.type);
  }, 50); // 50ms debounce
}



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








// WORK IN PROGRESS
export function validateSSN (
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



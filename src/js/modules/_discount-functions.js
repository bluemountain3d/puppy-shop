import { cartObject } from './_cart-functions.js';


//* Discounts *//

/* Discount functions ToDo
 * Check if Day is Monday and Hour is less than 10
   Måndag före kl. 10 ges 10% rabatt på hela beställningssumman
   If true change multiply order total by 0.9
*/

// Add 15% on the price from friday 15:00 to monday 03:00
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

// 10% discount if quantity is X or more apply dicount
export function itemQtyDiscount(price, quantity, amount=10, discount=.9) {
  if (Number(quantity) >= amount) {
    return parseInt(price * discount, 10);
  } else {
    return price;
  }
}


export function calculateDiscount(price, quantity, weekendPricing) {
  const newCurrentPrice = weekendPricing(price) * quantity;
  if (quantity >= 10) {
    return newCurrentPrice - itemQtyDiscount(newCurrentPrice, quantity);
  } else {
    const currentPrice = itemQtyDiscount(price * quantity, quantity);
    return price * quantity - currentPrice;
  }
}

//* Discounts *//

/* Discount functions ToDo
 * Check if Day is Monday and Hour is less than 10
   Måndag före kl. 10 ges 10% rabatt på hela beställningssumman
   If true change multiply order total by 0.9
*/

// Add 15% on the price from friday 15:00 to monday 03:00
export function weekendPricing(price, change=1.15) {
  const date = new Date();
  if ((date.getDay() >= 5 && date.getHours() >= 15) ||
      (date.getDay() >= 6) ||
      (date.getDay() < 2 && date.getHours() < 3)) {
    return parseInt(price * change);
  } else {
    return price;
  }
}

// 10% discount if quantity is X or more apply dicount
export function itemQtyDiscount(price, quantity, amount=10, discount=.9) {
  if (Number(quantity) >= amount) {
    return price * discount;
  } else {
    return price;
  }
}
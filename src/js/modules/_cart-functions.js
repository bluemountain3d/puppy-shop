import { productsObject } from './_products-object.js';


// cart object
export const cartObject = {
  counter: 0,
  cartSummary: {
    
    subtotal: 0,
    discounts: 0,
    vat: 0,
    shippingCost: 0,
    total: 0,
  },
};


// Function to find an item by productId in cartObject
export function findItemByProductId(cartObject, productId) {
  const foundItem = Object.values(cartObject).find(item => {
    return item && item.productId === productId;
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


// Function to get the highest index actual number in a object
export function getHighestIndex(obj) {
  // Get only numeric keys
  const numericKeys = Object.keys(obj)
    .map(key => parseInt(key, 10)) // Convert keys to integers
    .filter(key => !isNaN(key)); // Filter out non-numeric keys

  // Return the highest numeric key or -1 if there are no numeric keys
  return numericKeys.length > 0 ? Math.max(...numericKeys) : 1;
}




// Import objects
import {
  productsObject
} from "./objects.js";

// Import product functions
import {
  productCard,
  setCardUpdateInterval,
} from "./product-card-functions.js";


// Populate filtered product cards function
export function populateFilteredCards(array) {
  // Products wrapper element
  const productsWrapper = document.querySelector('.js-products');
  productsWrapper.innerHTML = '';

  // Populate filtered product cards
  array.forEach(item => {
    productsWrapper.innerHTML += productCard(item);
  });

  // Update card price every x minute
  setCardUpdateInterval(15);
}




export const initProductFilters = (() => {
  // Products array
  const productsArray = Object.values(productsObject);

  // Get list boxes
  const typeFilter = document.querySelector('#dog-type');
  const commonFilter = document.querySelector('#filter');


  //* Type filter
  typeFilter.addEventListener('input', handleTypeFilter);

  function handleTypeFilter(e) {
    const value = e.target.value;
  
    const typesArray = value === 'alla' 
      ? productsArray 
      : productsArray.filter(item => item.breedInfo.type.includes(value));
      
    populateFilteredCards(typesArray);
  }


  //* Common filter
  commonFilter.addEventListener('input', handleCommonFilter);

  function handleCommonFilter(e) {
    const select = e.target;
    const value = Number(select.value);
  
    const commonArray = productsArray.sort((a, b) => {
      switch (value) {
        case 0: // Popularity High to Low
          return b.properties.popularity - a.properties.popularity;
        case 1: // Popularity Low to High
          return a.properties.popularity - b.properties.popularity;
        case 2: // Breed A-Z
          return a.breedInfo.breed.localeCompare(b.breedInfo.breed);
        case 3: // Breed Z-A
          return b.breedInfo.breed.localeCompare(a.breedInfo.breed);
        case 4: // Price High to Low
          return b.priceInfo.price - a.priceInfo.price;
        case 5: // Price Low to High
          return a.priceInfo.price - b.priceInfo.price;
        default:
          return 0; // No sorting
      }
    });

    populateFilteredCards(commonArray);
  }

})();
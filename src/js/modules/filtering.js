

// const array = Object.values(myObject);

// Sort price Low to High
// array.sort((a, b) => return a.priceInfo.price - b.priceInfo.price);

// Sort price High to Low
// array.sort((a, b) => return b.priceInfo.price - a.priceInfo.price);

// Sort name A-Z
// array.sort((a, b) => return a.breedInfo.breed > b.breedInfo.breed);

// Sort name Z-A
// array.sort((a, b) => return a.breedInfo.breed < b.breedInfo.breed);



// Sum all values: (sumOf, current) => sumOf + cutrent.priceInfo.price
// const startSum = 0;
// const sum  = array.reduce((a, b) => a + b.priceInfo.price, startSum);

export function sum(array, startValue) {
  return array.reduce((sumOf, sum) => {

  });
}


// filter categories
// const types = array.filter(i => (i.breedInfo.type).includes('TYPE'));

export function type(obj, type) {
  const array = Object.values(obj);
  return array.filter(i => (i.breedInfo.type).includes(type)); //type.toLowerCase()??
}

export function getItem(item) {
  
}
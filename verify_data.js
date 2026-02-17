
const { products } = require('./src/data.js');

console.log("Total Products:", products.length);
console.log("First Product:", products[0].title);
console.log("Last Product:", products[products.length - 1].title);

if (products.length === 8) {
    console.log("SUCCESS: 8 products found.");
} else {
    console.log("FAILURE: Expected 8 products, found " + products.length);
}

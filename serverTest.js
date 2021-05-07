const indices = require('./public/assets/js/Indices');
// const tickerPrice = require('./public/assets/js/stockQuote');

// console.log(tickerPrice('SQ'));

const indiceObj = indices();
// console.log("After it's passed over: ");
console.log(indiceObj);
// console.log(indices);
async function testObj(obj) {
    const test = await obj();
    console.log(test);
}

testObj(indices);
const router = require("express").Router();
const fetch = require('node-fetch');

require('dotenv').config();

// converts number to $xxx.yy format in string type (not used - to be removed once finalized)
// const formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   });

// async function tickerPrice(ticker) {

router.get('/:ticker', async (req, res) => {
 
    let ticker = req.params.ticker;

    // initialize an object to respond to route.get
    const quoteRes = { ticker, quote: '' };

    // URL to the alphavantage api for stock quote json object (5 requests/minute & 500 requests/day limit)
    let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.API_KEY1}`;

    await fetch(url).then(function(response) {
        if (response.ok) {
            response.json().then(function(quote) {
                // returns the quote in xx.yy format (with 2 deciaml pts)
                if (!quote["Note"]) {
                    let priceQuote = quote["Global Quote"]["05. price"]*100/100;
                    // Setting price quote to the quote property of quoteRes object
                    quoteRes.quote = priceQuote;
                    res.json(quoteRes);
                } else {
                    alert("You have hit the query limit!");
                    return;
                }
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        response.json(error);
    });
});

module.exports = router;

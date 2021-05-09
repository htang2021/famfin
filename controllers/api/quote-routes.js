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
    const quoteRes = {
        ticker,
        quote: ''
    };

    // URL to the alphavantage api for stock quote json object
    let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.API_KEY1}`;

    await fetch(url).then(function(response) {
        if (response.ok) {
            response.json().then(function(quote) {
                // returns the quote in USD of string type $xx.yy
                console.log(quote["Global Quote"]["05. price"]*100/100);
                let priceQuote = quote["Global Quote"]["05. price"]*100/100;
                quoteRes.quote = priceQuote;
                console.log(quoteRes);
                res.json(quoteRes);
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

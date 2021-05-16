const router = require("express").Router();
const fetch = require('node-fetch');

require('dotenv').config();

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
                // If response does not return a "Note" object - which is a "hit-the-limit" object
                if (!quote["Note"]) {
                    // returns the quote in xx.yy format (with 2 deciaml pts)
                    let priceQuote = quote["Global Quote"]["05. price"]*100/100;
                    // Setting price quote to the quote property of quoteRes object
                    quoteRes.quote = priceQuote;
                    res.json(quoteRes);
                // If response returned an object with "Note" property, it's a "hit-the-limit" object
                } else {
                    // console logging to the backend console where npm start is initiated
                    console.log(" ");
                    console.log("************************************************************");
                    console.log("********  You have hit the 5 queries/minute limit!  ********");
                    console.log("****** Please wait for a minute before trying again. *******");
                    console.log("************************************************************");
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

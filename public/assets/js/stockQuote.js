require('dotenv').config();

// converts number to $xxx.yy format in string type
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

function tickerPrice(ticker) {

    let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.API_KEY}`;

    fetch (url).then(function(res) {
        if (res.ok) {
            res.json().then(function(quote) {
                // returns the quote in USD of string type $xx.yy
                return formatter.format(quote["Global Quote"]["05. price"]);
            });
        } else {
            alert("Error: " + res.statusText);
        }
    })
    .catch(function(error) {
        res.json(error);
    });
}

module.exports = tickerPrice(ticker);
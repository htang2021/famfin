// url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo";


// require('dotenv').config();

const ticker = 'TQQQ';

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

const tickerHtml = document.querySelector('.stock-quote');

let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apikey}`;
// let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.API_KEY}`;

const presentTicker = function(data) {
    let amount = formatter.format(data["Global Quote"]["05. price"]);
    console.log("Typof amount is: " + typeof(amount));
    tickerHtml.textContent = amount;
}

fetch (url).then(function(res) {
    if (res.ok) {
        console.log(res);
        console.log("==============");
        res.json().then(function(quote) {
            console.log(quote["Global Quote"]["05. price"]);
            presentTicker(quote);
        });
    } else {
        alert("Error: " + res.statusText);
    }
})
.catch(function(error) {
    res.json(error);
});

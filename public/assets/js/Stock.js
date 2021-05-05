// url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo";

const apikey = "Z3IMNRJSEUXUSQM3";
const ticker = 'SQ';

const tickerHtml = document.querySelector('.stock-quote');

let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apikey}`;

const presentTicker = function(data) {
    tickerHtml.textContent = data["Global Quote"]["05. price"];
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

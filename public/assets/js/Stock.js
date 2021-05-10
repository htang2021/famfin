// url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo";

apikey = "1d8c39832e794358a6b5c2baec3e692e";
// require('dotenv').config();

// DJI (Dow Jones), IXIC (Nasdaq), GSPC (S&P 500),
// RUT (Russell 2000), 
const ticker = 'DJI,IXIC,GSPC,RUT';

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

const tickerHtml = document.querySelector('.stock-quote');

let url = `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1day&apikey=${apikey}`;
// let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.API_KEY}`;

const presentTicker = function(data) {
    let indice = data["DJI"]["values"].close;
    console.log("Typof amount is: " + typeof(indice));
    tickerHtml.textContent = indice;
}

function majorIndices() {

    fetch (url).then(function(res) {
        if (res.ok) {
            console.log(res);
            console.log("==============");
            res.json().then(function(quote) {
                console.log(quote);
                console.log("DJI: " + Math.round(quote.DJI.values[0].close));
                console.log("DJI-1: " + Math.round(quote.DJI.values[1].close));
                console.log("IXIC: " + Math.round(quote.IXIC.values[0].close));
                console.log("GSPC: " + Math.round(quote.GSPC.values[0].close));
                console.log("RUT: " + Math.round(quote.RUT.values[0].close));
                return {
                    "DJI": Math.round(quote.DJI.values[0].close),
                    "IXIC": Math.round(quote.IXIC.values[0].close),
                    "GSPC": Math.round(quote.GSPC.values[0].close),
                    "RUT": Math.round(quote.RUT.values[0].close)
                }
            });
        } else {
            alert("Error: " + res.statusText);
        }
    })
    .catch(function(error) {
        res.json(error);
    });
}
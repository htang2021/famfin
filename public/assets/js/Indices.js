// require('dotenv').config();
apikey = "1d8c39832e794358a6b5c2baec3e692e";

// DJI (Dow Jones), IXIC (Nasdaq), GSPC (S&P 500),
// RUT (Russell 2000), 
const ticker = 'DJI,IXIC,GSPC,RUT';

let url = `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1day&apikey=${apikey}`;
// let url = `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1day&apikey=${process.env.API_KEY2}`;

function indices(url) {

    fetch (url).then(function(res) {
        if (res.ok) {
            res.json().then(function(quote) {
                let majorIndices = {
                    DJI: Math.round(quote.DJI.values[0].close),
                    IXIC: Math.round(quote.IXIC.values[0].close),
                    GSPC: Math.round(quote.GSPC.values[0].close),
                    RUT: Math.round(quote.RUT.values[0].close)
                };
                // console.log(majorIndices);
                return majorIndices;
            });
        } else {
            alert("Error: " + res.statusText);
        }
    })
    .catch(function(error) {
        res.json(error);
    });
}


module.exports = indices;
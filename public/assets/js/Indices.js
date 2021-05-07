const fetch = require('node-fetch');

require('dotenv').config();

async function indices() {
    // DJI (Dow Jones), IXIC (Nasdaq), GSPC (S&P 500),
    // RUT (Russell 2000), 
    const ticker = 'DJI,IXIC,GSPC,RUT';

    // let url = `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1day&apikey=1d8c39832e794358a6b5c2baec3e692e`;
    let url = `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1day&apikey=${process.env.API_KEY2}`;

    await fetch(url).then(res => {
        if (res.ok) {
            res.json().then(quote => {
                // Set object to only contain needed key/value pairs
                let majorIndices = {
                    DJI: Math.round(quote.DJI.values[0].close*100)/100,
                    IXIC: Math.round(quote.IXIC.values[0].close*100)/100,
                    GSPC: Math.round(quote.GSPC.values[0].close*100)/100,
                    RUT: Math.round(quote.RUT.values[0].close*100)/100
                };
                console.log(majorIndices);
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

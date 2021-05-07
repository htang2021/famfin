function indices() {
    // DJI (Dow Jones), IXIC (Nasdaq), GSPC (S&P 500),
    // RUT (Russell 2000), 
    const ticker = 'DJI,IXIC,GSPC,RUT';

    let url = `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1day&apikey=1d8c39832e794358a6b5c2baec3e692e`;
    // let url = `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1day&apikey=${process.env.API_KEY2}`;

    fetch (url).then(res => {
        if (res.ok) {
            res.json().then(function(quote) {
                console.log(quote);
                
                // Set object to only contain needed key/value pairs
                let majorIndices = {
                    DJI: Math.round(quote.DJI.values[0].close - quote.DJI.values[1].close),
                    IXIC: Math.round(quote.IXIC.values[0].close - quote.IXIC.values[1].close),
                    GSPC: Math.round(quote.GSPC.values[0].close - quote.GSPC.values[1].close),
                    RUT: Math.round(quote.RUT.values[0].close - quote.RUT.values[1].close)
                };
                
                console.log(majorIndices);
                

                
                return majorIndices;
            })
            .then(majorIndices => {
                
                if ()
                
                // document.querySelector("#dji").innerText = majorIndices.DJI;
                // document.querySelector("#ixic").innerText = majorIndices.IXIC;
                // document.querySelector("#gspc").innerText = majorIndices.GSPC;
                // document.querySelector("#rut").innerText = majorIndices.RUT;
            })
        } else {
            alert("Error: " + res.statusText);
        }
    })
    .catch(err => {
        console.log(err);
    });
}

indices();

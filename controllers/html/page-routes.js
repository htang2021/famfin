const router = require('express').Router();
const fetch = require('node-fetch');

require('dotenv').config();

// homepage
router.get('/', async (req, res) => {
		// DJI (Dow Jones), IXIC (Nasdaq), GSPC (S&P 500),
		// RUT (Russell 2000), 
		const ticker = 'DJI,IXIC,GSPC,RUT';
		let url = `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1day&apikey=${process.env.API_KEY2}`;

		await fetch(url).then(data => {
			if (data.ok) {
				data.json().then(quote => {
					// Calculate % increase or decrease between today and yesterday
					let djiDelta = Math.round(((quote.DJI.values[0].close - quote.DJI.values[1].close)/quote.DJI.values[1].close)*100*100)/100;
					let nasdaqDelta = Math.round(((quote.IXIC.values[0].close - quote.IXIC.values[1].close)/quote.IXIC.values[1].close)*100*100)/100;
					let spDelta = Math.round(((quote.GSPC.values[0].close - quote.GSPC.values[1].close)/quote.GSPC.values[1].close)*100*100)/100;
					let russellDelta = Math.round(((quote.RUT.values[0].close - quote.RUT.values[1].close)/quote.RUT.values[1].close)*100*100)/100;
					
					// Set object to only contain needed key/value pairs
					let majorIndices = {
						DJI: Math.round(quote.DJI.values[0].close*100)/100,
						DJIDelta: djiDelta,
						IXIC: Math.round(quote.IXIC.values[0].close*100)/100,
						IXICDelta: nasdaqDelta,
						GSPC: Math.round(quote.GSPC.values[0].close*100)/100,
						SPDelta: spDelta,
						RUT: Math.round(quote.RUT.values[0].close*100)/100,
						RUTDelta: russellDelta
					};
					return majorIndices;
				})
				.then(majorIndices => {
					res.render('login', majorIndices);
				});
			} else {
				alert("Error: " + data.statusText);
			}
		})
		.catch(function(error) {
			data.json(error);
		});
	// res.render('login');
});

// dashboard
router.get('/dashboard', (req, res) => {
	// todo:
	// ask sessions if user is logged in
	// if uses is logged in, display /dashboard
		// pull data from database and APIs
	// else reroute user to /
	
	const loggedIn = true;
	res.render('dashboard', { loggedIn });
});

router.get("/login", (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}

	res.render("login");
});

module.exports = router;
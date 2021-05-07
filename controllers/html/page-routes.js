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
					// Set object to only contain needed key/value pairs
					let majorIndices = {
						DJI: Math.round(quote.DJI.values[0].close*100)/100,
						IXIC: Math.round(quote.IXIC.values[0].close*100)/100,
						GSPC: Math.round(quote.GSPC.values[0].close*100)/100,
						RUT: Math.round(quote.RUT.values[0].close*100)/100
					};
					// console.log(majorIndices);
					return majorIndices;
				})
				.then(majorIndices => {
					let dow = majorIndices.DJI;
					let nasdaq = majorIndices.IXIC;
					let sp500 = majorIndices.GSPC;
					let russell2k = majorIndices.RUT;
					res.render('login', { majorIndices });
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
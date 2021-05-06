const router = require('express').Router();

// homepage
router.get('/', (req, res) => {
	res.render('login');
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
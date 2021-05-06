const router = require('express').Router();

// homepage
router.get('/', (req, res) => {
	res.render('login');
});

// homepage
router.get('/dashboard', (req, res) => {
	res.render('dashboard');
});

router.get("/login", (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}

	res.render("login");
});

module.exports = router;
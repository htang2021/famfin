const router = require('express').Router();

// homepage
router.get('/', (req, res) => {
	res.render('login');
});

// homepage
router.get('/dashboard', (req, res) => {
	res.render('dashboard');
});

module.exports = router;
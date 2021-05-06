const router = require('express').Router();

const htmlRoutes = require('./html/page-routes.js');

router.use('/', htmlRoutes);

router.use((req, res) => {
	res.status(404).end();
});

module.exports = router;

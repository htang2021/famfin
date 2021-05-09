const router = require("express").Router();
const userRoutes = require("./user-routes");
const memberRoutes = require("./member-routes");
const fundRoutes = require("./fund-routes");
const quoteRoutes = require("./quote-routes");

router.use("/users", userRoutes);
router.use("/member", memberRoutes);
router.use("/fund", fundRoutes);
router.use("/quote", quoteRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;
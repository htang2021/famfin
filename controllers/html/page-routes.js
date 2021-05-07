const { Fund } = require("../../models");
const withAuth = require("../../utils/auth");

const router = require("express").Router();

// homepage
router.get("/", (req, res) => {
  res.render("login");
});

// dashboard
router.get("/dashboard", withAuth, (req, res) => {
  // todo:
  // ask sessions if user is logged in
  // if uses is logged in, display /dashboard
  // pull data from database and APIs
  // else reroute user to /

  //   Fund.findAll({
  //     attributes: [],
  //     include: [],
  //   })
  //     .then((dbFundData) => {
  //       const funds = dbFundData.map((fund) => fund.get({ plain: true }));
  //       res.render("main", { funds, loggedIn: true });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  const loggedIn = true;
  res.render("dashboard", { loggedIn });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;

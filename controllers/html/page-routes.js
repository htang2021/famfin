const { Fund, Member } = require("../../models");
const withAuth = require("../../utils/auth");

const router = require("express").Router();
const fetch = require("node-fetch");

require("dotenv").config();

// homepage
router.get("/", (req, res) => {
  // if session exists, redirect to dashboard
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }

  // DJI (Dow Jones), IXIC (Nasdaq), GSPC (S&P 500),
  // RUT (Russell 2000),
  const ticker = "DJI,IXIC,GSPC,RUT";
  let url = `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1day&apikey=${process.env.API_KEY2}`;

  fetch(url)
    .then((data) => {
      if (data.ok) {
        data
          .json()
          .then((quote) => {
            // Calculate % increase or decrease between today and yesterday
            let djiDelta =
              Math.round(
                ((quote.DJI.values[0].close - quote.DJI.values[1].close) /
                  quote.DJI.values[1].close) *
                  100 *
                  100
              ) / 100;
            let nasdaqDelta =
              Math.round(
                ((quote.IXIC.values[0].close - quote.IXIC.values[1].close) /
                  quote.IXIC.values[1].close) *
                  100 *
                  100
              ) / 100;
            let spDelta =
              Math.round(
                ((quote.GSPC.values[0].close - quote.GSPC.values[1].close) /
                  quote.GSPC.values[1].close) *
                  100 *
                  100
              ) / 100;
            let russellDelta =
              Math.round(
                ((quote.RUT.values[0].close - quote.RUT.values[1].close) /
                  quote.RUT.values[1].close) *
                  100 *
                  100
              ) / 100;

            // Set object to only contain needed key/value pairs
            let majorIndices = {
              DJI: Math.round(quote.DJI.values[0].close * 100) / 100,
              DJIDelta: djiDelta,
              IXIC: Math.round(quote.IXIC.values[0].close * 100) / 100,
              IXICDelta: nasdaqDelta,
              GSPC: Math.round(quote.GSPC.values[0].close * 100) / 100,
              SPDelta: spDelta,
              RUT: Math.round(quote.RUT.values[0].close * 100) / 100,
              RUTDelta: russellDelta,
            };
            return majorIndices;
          })
          .then((majorIndices) => {
            res.render("login", majorIndices);
          });
      } else {
        alert("Error: " + data.statusText);
      }
    })
    .catch(function (error) {
      data.json(error);
    });
});

// dashboard
router.get("/dashboard", withAuth, (req, res) => {
  const pageTitle = "Dashboard";
console.log(req.session);
  // if no session exists, redirect to login
  if (!req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  const loggedIn = req.session.loggedIn;

  Member.findAll({
    where: {
      user_id: req.session.user_id,
    },
    include: {
      model: Fund,
    },
  })
    .then((dbMemberData) => {
      if (!dbMemberData) {
        res.status(404).json({ message: "No such family member." });
        return;
      }
      console.log(dbMemberData);
      res.render("dashboard", { loggedIn, dbMemberData, pageTitle });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/login", (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect("/");
//     return;
//   }
//
//   res.render("login");
// });

module.exports = router;

const router = require('express').Router();
const { Fund } = require('../../models');
const withAuth = require("../../utils/auth");

router.post('/', withAuth, (req, res) => {
    Fund.findAll({
        where: {
            stock_name: req.body.stock_name,
            member_id: req.body.member_id
        }
    })
        .then(dbFundData => {
            const updatedCost = parseFloat(dbFundData[0].dataValues.initial_cost) + req.body.initial_cost;
            const updatedQuantity = dbFundData[0].dataValues.quantity + req.body.quantity;
            Fund.update(
                {
                    quantity: updatedQuantity,
                    initial_cost: updatedCost
                },
                {
                    where: {
                        id: dbFundData[0].dataValues.id
                    }
                }
            )
                .then(dbFundData => {
                    if (!dbFundData) {
                        // res.status(404).json({ message: 'No such fund.' });
                        // return;
                    }
                    res.json(dbFundData);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                })
        })
        .catch(err => {
            Fund.create({
                stock_name: req.body.stock_name,
                quantity: req.body.quantity,
                initial_cost: req.body.initial_cost,
                member_id: req.body.member_id
            })
                .then(dbFundData => res.json(dbFundData))
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });
        })
});

// show all and or show one by initial cost 
// find one on stock id initial cost
// in front end js, get the new cost of this stock find one + cost of new stock 
// req.body.initial_cost = previous line

router.put('/:id', withAuth, (req, res) => {
    Fund.update(
        {
            quantity: req.body.quantity,
            initial_cost: req.body.initial_cost
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbFundData => {
            if (!dbFundData) {
                res.status(404).json({ message: 'No such fund.' });
                return;
            }
            res.json(dbFundData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', withAuth, (req, res) => {
    Fund.findAll({
        where: {
            user_id: req.body.user_id
        }
    })
        .then(dbFundData => {
            if (!dbFundData) {
                res.status(404).json({ message: 'No such fund.' });
                return;
            }
            res.json(dbFundData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get an individual stock

router.get('/stock/:id', withAuth, (req, res) => {
    Fund.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(dbFundData => {
            if (!dbFundData) {
                res.status(404).json({ message: 'No such fund.' });
                return;
            }
            res.json(dbFundData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/ind/:id', withAuth, (req, res) => {
    Fund.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(dbFundData => {
        if (!dbFundData) {
          res.status(404).json({ message: 'No such stock found.' });
          return;
        }
        res.json(dbFundData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // delete a stock 
  router.delete('/:id', withAuth, (req, res) => {
    Fund.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbFundData => {
        if (!dbFundData) {
          res.status(404).json({ message: "I'm sorry, I don't find that stock." });
          return;
        }
        res.json(dbFundData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

  
module.exports = router;

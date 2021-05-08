const router = require('express').Router();
const { Fund } = require('../../models');
const withAuth = require("../../utils/auth");

router.post('/', (req, res) => {
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
});

// show all and or show one by initial cost 
// find one on stock id initial cost
// in front end js, get the new cost of this stock find one + cost of new stock 
// req.body.initial_cost = previous line

router.put('/:id', (req, res) => {
    Fund.update(
        {
            stock_quantity: req.body.stock_quantity,
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

router.get('/:id', (req, res) => {
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

module.exports = router;

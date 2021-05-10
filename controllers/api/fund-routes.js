const router = require('express').Router();
const { Fund } = require('../../models');
const withAuth = require("../../utils/auth");

router.post('/', (req, res) => {
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

router.put('/sell', (req, res) => {
    Fund.update(
        {
            stock_quantity: req.body.stock_quantity,
            initial_cost: req.body.initial_cost
        },
        {
            where: {
                id: req.body.id
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

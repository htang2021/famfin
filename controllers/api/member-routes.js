const router = require('express').Router();
const { Member, Fund } = require('../../models');

// Delete a family member
router.delete('/:id', (req, res) => {
  // delete one member by its `id` value
  Member.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbMemberData => {
      if (!dbMemberData) {
        res.status(404).json({ message: 'No such family member found.' });
        return;
      }
      res.json(dbMemberData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Member.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    relationship: req.body.relationship,
    is_user: req.body.is_user,
    user_id: req.session.user_id
  })
    .then(dbMemberData => res.json(dbMemberData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Member.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      relationship: req.body.relationship
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbMemberData => {
      if (!dbMemberData) {
        res.status(404).json({ message: 'No such family member.' });
        return;
      }
      res.json(dbMemberData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// /api/member/family
router.get('/family', (req, res) => {
  Member.findAll({
      where: {
          user_id: req.session.user_id
      },
      include: {
        model: Fund
      },
  })
      .then(dbMemberData => {
          if (!dbMemberData) {
              res.status(404).json({ message: 'No such family member.' });
              return;
          }
          res.json(dbMemberData);
          console.log(dbMemberData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// /api/member/test/1
router.get('/test/:id', (req, res) => {
  Member.findAll({
      where: {
          user_id: req.params.id
      },
      include: {
        model: Fund
      }
  })
      .then(dbMemberData => {
          if (!dbMemberData) {
              res.status(404).json({ message: 'No such family member.' });
              return;
          }
          res.json(dbMemberData);
          console.log(dbMemberData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});
// findone member
module.exports = router;

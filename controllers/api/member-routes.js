const router = require('express').Router();
const { Member } = require('../../models');

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
    family_id: req.body.family_id
  })
    .then(dbMemberData => res.json(dbMemberData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();

const PendingOrganizationAssociation = require('../models/pendingOrganizationAssociation');

router.get('', (req, res, next) => {

  let associationQuery = PendingOrganizationAssociation.find();

  if (req.query.user) {
    associationQuery = PendingOrganizationAssociation.find({
      user_id: req.query.user
    });
  }

  associationQuery.then(docs => {
    res.status(200).json({
      status: 'success',
      associations: docs
    });
  }).catch(err => {
    res.status(400).json({
      status: 'error',
      message: err
    });
  })
})

router.post('/', (req, res, next) => {
  const association = new PendingOrganizationAssociation({
    user_id: req.body.user_id,
    organization_id: req.body.organization_id
  });
  association.save().then(result => {
    res.status(201).json({
      status: 'success',
      association: result
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  });
});


module.exports = router;

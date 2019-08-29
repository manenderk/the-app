const express = require('express');
const router = express.Router();

const Role = require('../models/role.schema');

//GET ALL ROLES
router.get('', (req, res, next) => {
  Role.find().then(documents => {
    res.status(201).json({
      status: 'success',
      roles: documents
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

//GET SINGLE ROLE
router.get('/:id', (req, res, next) => {
  Role.findOne({
    _id: req.params.id
  }).then(document => {
    if (!document) {
      return res.status(401).json({
        status: 'error',
        message: 'role not found'
      })
    }
    res.status(201).json({
      status: 'success',
      role: document
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

//ADD ROLE
router.post('', (req, res, next) => {
  const role = new Role({
    name: req.body.name
  });
  role.save().then(result => {
    res.status(201).json({
      status: 'success',
      role: result
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

//UPDATE ROLE
router.put('/:id', (req, res, next) => {
  const role = new Role({
    _id: req.params.id,
    name: req.body.name
  });
  Role.updateOne({
    _id: req.params.id
  }, role).then(result => {
    if(result.nModified == 0){
      return res.status(401).json({
        status: 'error',
        message: 'role not found'
      })
    }
    res.status(201).json({
      status: 'success',
      message: 'role updated'
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

//DELETE ROLE
router.delete('/:id', (req, res, next) => {
  Role.deleteOne({
    _id: req.params.id
  }).then(result => {
    if (result.deletedCount == 0) {
      return res.status(401).json({
        status: 'error',
        message: 'role not found'
      })
    }
    res.status(201).json({
      status: 'success',
      message: 'role deleted'
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  });
});

module.exports = router;

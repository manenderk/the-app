const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.schema');

//GET ALL USERS
router.get('/', (req, res, next) => {
  User.find().then(documents => {
    res.status(201).json({
      status: 'success',
      users: documents
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

//GET SINGLE USER
router.get('/:id', (req, res, next) => {
  User.findOne({
    _id: req.params.id
  }).then(document => {
    if (!document) {
      return res.status(401).json({
        status: 'error',
        message: 'user not found'
      })
    }
    res.status(201).json({
      status: 'success',
      user: document
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
})

//ADD USER
router.post('/add', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hash,
      employee_id: req.body.employee_id,
      dob: req.body.dob,
      organization_id: req.body.organization_id,
      role_id: req.body.role_id,
      active: req.body.active,
      created: new Date(),
      modified: new Date()
    });

    user.save().then(result => {
      res.status(201).json({
        status: 'success',
        user: {
          id: result._id,
          email: result.email
        }
      });
    }).catch(err => {
      res.status(501).json({
        status: 'error',
        message: err
      })
    })
  });
});

//UPDATE USER
router.put('/:id', (req, res, next) => {
  const user = new User({
    _id: req.params.id,
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    email: req.body.email,
    employee_id: req.body.employee_id,
    dob: req.body.dob,
    organization_id: req.body.organization_id,
    role_id: req.body.role_id,
    active: req.body.active,
    modified: new Date()
  });
  User.updateOne({
    _id: req.params.id
  }, user).then(result => {
    if (result.nModified == 0) {
      return res.status(401).json({
        status: 'error',
        message: 'user not found'
      })
    }
    res.status(201).json({
      status: 'success',
      message: 'user updated'
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

//DELETE USER
router.delete('/:id', (req, res, next) => {
  User.deleteOne({
    _id: req.params.id
  }).then(result => {
    if (result.deletedCount == 0) {
      return res.status(401).json({
        status: 'error',
        message: 'user not found'
      })
    }
    res.status(201).json({
      status: 'success',
      message: 'user deleted'
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  });
});


//update password
router.put('/update-password/:id', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      _id: req.params.id,
      password: hash,
      modified: new Date()
    });
    User.updateOne({
      _id: req.params.id
    }, user).then(result => {
      if (result.nModified == 0) {
        return res.status(401).json({
          status: 'error',
          message: 'user not found'
        })
      }
      res.status(201).json({
        status: 'success',
        message: 'user updated'
      })
    }).catch(err => {
      res.status(501).json({
        status: 'error',
        message: err
      })
    })
  });

});

module.exports = router;
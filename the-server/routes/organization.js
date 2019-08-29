const express = require('express');
const multer = require('multer');
const imageStorage = require('../util/file-upload');

const router = express.Router();

const Organization = require('../models/organization.schema');

//GET ALL ORGANIZATIONS
router.get('', (req, res, next) => {
  Organization.find().then(documents => {
    res.status(201).json({
      status: 'success',
      organizations: documents
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

//GET SINGLE Organization
router.get('/:id', (req, res, next) => {
  Organization.findOne({
    _id: req.params.id
  }).then(document => {
    if (!document) {
      return res.status(401).json({
        status: 'error',
        message: 'organization not found'
      })
    }
    res.status(201).json({
      status: 'success',
      organization: document
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

//ADD Organization
router.post('', multer({
  storage: imageStorage
}).single('logo'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const organization = new Organization({
    name: req.body.name,
    description: req.body.description,
    logo: req.file ?  url + '/images/' + req.file.filename : '',
    active: req.body.active,
    created: new Date()
  });
  organization.save().then(result => {
    res.status(201).json({
      status: 'success',
      Organization: result
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

//UPDATE Organization
router.put('/:id', multer({
  storage: imageStorage
}).single('logo'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  let logo = req.body.logo;
  if(req.file){
    logo = url + '/images/' + req.file.filename;
  }
  const organization = new Organization({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    logo: logo,
    active: req.body.active,
    created: new Date()
  });
  Organization.updateOne({
    _id: req.params.id
  }, organization).then(result => {
    if(result.nModified == 0){
      return res.status(401).json({
        status: 'error',
        message: 'organization not found'
      })
    }
    res.status(201).json({
      status: 'success',
      message: 'organization updated'
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

//DELETE Organization
router.delete('/:id', (req, res, next) => {
  Organization.deleteOne({
    _id: req.params.id
  }).then(result => {
    if (result.deletedCount == 0) {
      return res.status(401).json({
        status: 'error',
        message: 'organization not found'
      })
    }
    res.status(201).json({
      status: 'success',
      message: 'organization deleted'
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  });
});


module.exports = router;

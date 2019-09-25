const express = require('express');
const multer = require('multer');
const imageStorage = require('../util/file-upload');

const router = express.Router();

const Event = require('../models/event.schema');

//GET ALL EVENTS
router.get('', (req, res, next) => {
  Event.find().then(documents => {
    res.status(201).json({
      status: 'success',
      events: documents
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

//GET SINGLE Event
router.get('/:id', (req, res, next) => {
  Event.findById(req.params.id).then(document => {
    if (!document) {
      return res.status(401).json({
        status: 'error',
        message: 'event not found'
      })
    }
    res.status(201).json({
      status: 'success',
      event: document
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

//ADD Event
router.post('', multer({
  storage: imageStorage
}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    image: req.file ? url + '/images/' + req.file.filetitle : '',
    organization_id: req.body.organization_id,
    active: req.body.active,
    created: new Date()
  });
  event.save().then(result => {
    res.status(201).json({
      status: 'success',
      event: result
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

//UPDATE Event
router.put('/:id', multer({
  storage: imageStorage
}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  let image = req.body.image;
  if (req.file) {
    image = url + '/images/' + req.file.filetitle;
  }
  const event = new Event({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    image: image,
    organization_id: req.body.organization_id,
    active: req.body.active,
    modified: new Date()
  });
  Event.updateOne({
    _id: req.params.id
  }, event).then(result => {
    if (result.nModified == 0) {
      return res.status(401).json({
        status: 'error',
        message: 'event not found'
      })
    }
    res.status(201).json({
      status: 'success',
      message: 'event updated'
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

//DELETE Event
router.delete('/:id', (req, res, next) => {
  Event.deleteOne({
    _id: req.params.id
  }).then(result => {
    if (result.deletedCount == 0) {
      return res.status(401).json({
        status: 'error',
        message: 'event not found'
      })
    }
    res.status(201).json({
      status: 'success',
      message: 'event deleted'
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  });
});


module.exports = router;

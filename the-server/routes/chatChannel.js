const express = require('express');
const router = express.Router();

const ChatChannel = require('../models/chatChannel.schema');

router.get('/:userId', (req, res, next) => {

  const userId = req.params.userId;

  ChatChannel.find({
    $or: [
      {
        'user_1': userId
      }, {
        'user_2': userId
      }
    ]
  }).then(channels => {
    res.status(200).json({
      status: 'success',
      feeds: channels
    })
  }).catch(error => {
    res.status(500).json({
      status: 'error',
      message: error
    })
  })
});

router.post('/', (req, res, next) => {
  const chatChannel = new ChatChannel({
    user_1: req.body.user_1,
    user_2: req.body.user_2,
    date: new Date()
  });
  chatChannel.save().then(doc => {
    res.status(200).json({
      status: 'success',
      channel: doc
    })
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});

router.delete('/:channelId', (req, res, next) => {
  const channelId = req.params.channelId;

  ChatChannel.findByIdAndDelete(channelId).then(doc => {
    res.status(200).json({
      status: 'success'
    });
  }).catch(err => {
    res.status(500).json({
      status: 'error'
    })
  });
})

module.exports = router;

const express = require('express');
const router = express.Router();

const ChatChannel = require('../models/chatChannel.schema');

router.get('/:channelId', (req, res, next) => {
  const channelId = req.params.channelId;
  ChatChannel.findById(channelId).then(channel => {
    res.status(200).json({
      status: 'success',
      channel: channel
    });
  }).catch(error => {
    res.status(500).json({
      status: 'error',
      message: error
    })
  })
});

router.get('/user/:userId', (req, res, next) => {

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
      channels: channels
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

  getChannels(chatChannel.user_1, chatChannel.user_2).then(
    channel => {
      if(channel) {
        res.status(200).json({
          status: 'success',
          channel: channel
        });
      }
      else {
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
      }
    }
  );
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

function getChannels(user1, user2) {
  return new Promise((resolve, reject) => {
    ChatChannel.findOne({
      $or: [{
          'user_1': user1,
          'user_2': user2
        },
        {
          'user_1': user2,
          'user_2': user1
        }
      ]
    }).then(doc => {
      if (doc) {
        return resolve(doc);
      } else {
        return resolve(false);
      }
    }).catch(error => {
      console.log(error);
    })
  })

}

module.exports = router;

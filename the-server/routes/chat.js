const express = require('express');
const router = express.Router();

const Chat = require('../models/chat.schema');


router.get('/chat-count/:channelId', (req, res, next) => {
  const channelId = req.params.channelId;
  Chat.find({
    channel_id: channelId
  }).then(chats => {
    res.status(200).json({
      status: 'success',
      count: chats.length
    })
  }).catch(error => {
    res.status(500).json({
      status: 'error',
      message: error
    })
  });
})

router.get('/:channelId', (req, res, next) => {
  const channelId = req.params.channelId;
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;

  const chatQuery = Chat.find({
    channel_id: channelId
  });

  if(pageSize && currentPage) {
    chatQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  chatQuery.sort({
    date: -1
  });

  chatQuery.then(chats => {
    res.status(200).json({
      status: 'success',
      chats: chats
    })
  }).catch(error => {
    res.status(500).json({
      status: 'error',
      message: error
    })
  });
});

router.post('/', (req, res, next) => {
  const chat = new Chat({
    channel_id: req.body.channel_id,
    sender: req.body.sender,
    receiver: req.body.receiver,
    text: req.body.text,
    date: new Date()
  });

  chat.save().then(doc => {
    res.status(200).json({
      status: 'success',
      chat: doc
    })
  }).catch(error => {
    res.status(500).json({
      status: 'error',
      message: error
    })
  });
})

router.delete('/:chatId', (req, res, next) => {
  const chatId = req.params.chatId;
  Chat.findByIdAndDelete(chatId).then(doc => {
    res.status(200).json({
      status: 'success',
      message: doc
    });
  }).catch(error => {
    res.status(500).json({
      status: 'error',
      message: error
    });
  });
});

module.exports = router;

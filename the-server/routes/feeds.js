const express = require('express');
const router = express.Router();
const Feed = require('../models/feed.schema');

router.get('/:orgId', (req, res, next) => {
  const orgId = req.params.orgId;
  Feed.find({
    organization_id: orgId
  }).then(feeds => {
    res.status(200).json({
      status: 'success',
      feeds: feeds
    })
  }).catch(err => {
    res.status(500).json({
      status: 'error',
      message : err
    })
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

const OrganizationRequest = require('../models/organizationRequest.schema');
const CommonUtil = require('../util/common');
const commonUtil = new CommonUtil();

router.get('', (req, res, next) => {
  OrganizationRequest.find().then(docs => {
    res.status(200).json({
      status: 'success',
      organization_requests: docs
    })
  }).catch(err => {
    res.status(500).json({
      status: 'error',
      message: err
    })
  })
});

router.post('', (req, res, next) => {
  const organizationRequest = OrganizationRequest({
    organization_name: req.body.organization_name,
    user_id: req.body.user_id
  });

  organizationRequest.save().then(request => {
    res.status(200).json({
      status: 'success',
      organization_request: request
    });
  }).catch(err => {
    res.status(500).json({
      status: 'error',
      message: err
    })
  })
})

router.delete('/:id', (req, res, next) => {
  OrganizationRequest.findByIdAndDelete(req.params.id).then(doc => {
    res.status(200).json({
      status: 'success',
      message: 'Organization Request Deleted'
    });
  }).catch(err => {
    res.status(500).json({
      status: 'error',
      message: err
    })
  })
})

router.post('/approve', (req, res, next) => {
  OrganizationRequest.findById(
    req.body.request_id
  ).then(doc => {
    commonUtil.approveOrganization(doc.user_id, doc.organization_name).then(r => {
      if(r) {
        OrganizationRequest.findByIdAndDelete(doc._id).then(d => {
          res.status(200).json({
            status: 'success',
            message: 'approved'
          })
        }).catch(err => {
          res.status(500).json({
            status: 'error',
            message: err
          })
        })
      }
      else {
        res.status(400).json({
          status: 'error',
          message: 'request not found'
        })
      }
    })
  }).catch(err => {
     console.log('test', err);

    res.status(500).json({
      status: 'error',
      message: err
    })
  })
})



module.exports = router;

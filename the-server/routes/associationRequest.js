const express = require('express');
const router = express.Router();

const AssociationRequest = require('../models/associationRequest.schema');
const CommonUtil = require('../util/common');

const commonUtil = new CommonUtil();

router.get('', (req, res, next) => {

  let associationQuery = AssociationRequest.find();

  if (req.query.user) {
    associationQuery = AssociationRequest.find({
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
  const association = new AssociationRequest({
    user_id: req.body.user_id,
    organization_id: req.body.organization_id
  });
  association.save().then(result => {
    res.status(200).json({
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

router.post('/approve/', (req, res, next) => {
  AssociationRequest.findById(
    req.body.association_id
  ).then(result => {

    if(result._id){

      commonUtil.approveUserAssociationWithOrganization(result.user_id, result.organization_id).then(r => {
        if (r) {
          AssociationRequest.findByIdAndDelete(result._id).then(s => {
            res.status(200).json({
              status: 'success',
              message: 'Association Approved'
            })
          }).catch(err => {
            res.status(501).json({
              status: 'error',
              message: err.message
            })
          })
        } else {
          res.status(400).json({
            status: 'error',
            message: 'Not Found'
          })
        }
      })
    }
    else{
      res.status(400).json({
        status: 'error',
        message: 'Not Found'
      })
    }
  }).catch(err => {
    res.status(501).json({
      status: 'error',
      message: err.message
    })
  })
});

router.delete('/:id', (req, res, next) => {
  AssociationRequest.deleteOne({
      _id: req.params.id
    }).then(result => {
    res.status(200).json({
      status: 'success',
      message: 'Association Deleted',
    })
  }).catch (err => {
    res.status(501).json({
      status: 'error',
      message: err
    })
  })
});


module.exports = router;

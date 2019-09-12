const User = require('../models/user.schema');
const Organization = require('../models/organization.schema');
class CommonUtil {
  approveUserAssociationWithOrganization(userId, organizationId) {
    return new Promise(function(resolve, reject) {
      User.updateOne({
        _id: userId
      }, {
        organization_id: organizationId
      }).then(r => {
        if (r.nModified == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }).catch(err => {
        resolve(false);
      })
    });
  }

  approveOrganization(user_id, organization_name) {
    return new Promise(function(resolve, reject){
      const organization = Organization({
        name: organization_name,
        active: true,
        created: new Date()
      });
      organization.save().then(doc => {
        const updateUserData  = {
          organization_id: doc._id
        };
        User.findByIdAndUpdate(user_id, updateUserData).then(res => {
          resolve(true);
        }).catch(err => {
          resolve(false);
        })
      }).catch(err => {
        resolve(false);
      })
    });
  }
}

module.exports = CommonUtil;


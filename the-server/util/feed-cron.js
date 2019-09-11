var cron = require('node-cron');
var User = require('../models/user.schema');
var now = new Date();
/* var dayOfMonth = now.getDate();
var month = now.getMonth() + 1; */

//console.log(now, dayOfMonth, month);

cron.schedule('* * * * *', () => {

  /* User.findOne({
    "$expr": {
      "$and": [
        {
          "$eq": [
            {
              "$dob": "$dayOfMonth"
            }, {
              "$dayOfMonth": new Date()
            }
          ]
        },
        {
          "$eq": [
            {
              "$dob": "$month"
            }, {
              "$month": new Date()
            }
          ]
        }
      ]
    }
  }).then(users => {
    console.log(users);
  }).catch(err => {
    console.log(err);
  }) */
});

module.exports = cron;


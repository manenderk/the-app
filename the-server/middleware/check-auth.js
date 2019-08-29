const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'this_is_my_server_secret_key_which_should_be_hidden');
    req.userData = {
      userId: decodedToken.userId,
      email: decodedToken.email
    };
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Authentication failed',
      error: error
    });
  }
}

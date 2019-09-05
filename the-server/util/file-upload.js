const multer = require('multer');

const IMAGE_MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg'
};

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = IMAGE_MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid Mime Type');
    if(isValid){
      error = null;
    }
    cb(error, 'the-server/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = IMAGE_MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

module.exports = imageStorage;

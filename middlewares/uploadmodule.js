const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    //console.log("save.........................");
    const ext = file.mimetype.split('/')[1];
    var targetfile = uuidv4() + '.' + ext;
    //console.log("Save>>> " + targetfile);
    cb(null, targetfile);
  },
});

// Multer Filter
const imageFilter = (req, file, cb) => {
  if (
    file.mimetype.split('/')[1] === 'jpg' ||
    file.mimetype.split('/')[1] === 'jpeg' ||
    file.mimetype.split('/')[1] === 'png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Not a image file!!'), false);
  }
};

// Create the multer instance
const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5000000,
  },
  dest: 'uploads/',
});

module.exports = upload;

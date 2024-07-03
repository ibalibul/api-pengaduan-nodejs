var express = require('express');
var router = express.Router();

const upload = require('../middlewares/uploadmodule');
const { v4: uuidv4 } = require('uuid');

/* GET home page. */
router.get('/', async (req, res, next) => {
  // #swagger.tags = ["Index"]
  // #swagger.description = 'Endpoint untuk index http get.'

  // #swagger.response[200] = {
  // schema: {"$ref: "#/definitions/Salam"},
  // description: "Output API untuk object salam"}
  var salam = {
    pesan: 'Hallo, Selamat Datang di API Pengaduan Masyarakat',
    method: req.method,
  };
  res.json(salam);
});

router.post('/profile', upload.single('photo'), async (req, res, next) => {
  // #swagger.tags = ['Index']
  // #swagger.description = 'Endpoint untuk upload file.'
  /*
        #swagger.consumes = ['multipart/form-data']  
        #swagger.produces = ['application/json']
        #swagger.parameters['photo'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
            description: 'photo cover user',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['name'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'name user',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['email'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'email user',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['occupation'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'occupation user',
        } 
  */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Profile" },
      description: "Output API untuk objek Profile" } */

  var data = req.body;
  var ret = {
    id: uuidv4(),
    name: data.name,
    email: data.email,
    occupation: data.occupation,
    cover: '',
  };
  if (req.file != undefined) ret['cover'] = req.file.filename;

  res.json(ret);
});
module.exports = router;

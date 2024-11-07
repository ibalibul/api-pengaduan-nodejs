var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const Keamanan = db.keamanan;
const upload = require('../middlewares/uploadmodule');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['Keamanan']
  // #swagger.description = 'Endpoint untuk mengambil semua Keamanan.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Keamanan" },
    description: "Output API untuk objek Keamanan" } */

  var data = await Keamanan.findAll();
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['Keamanan']
  // #swagger.description = 'Endpoint untuk mengambil Keamanan berdasarkan id.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Keamanan" },
      description: "Output API untuk objek Keamanan" } */
  let id = req.params.id;
  var data = await Keamanan.findByPk(id);
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['Keamanan']
  // #swagger.description = 'Endpoint untuk mengambil Keamanan berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Keamanan" },
    description: "Output API untuk objek Keamanan" } */
  let id = req.params.id;
  var data = await Keamanan.findByPk(id);
  res.json(data);
});

router.post('/', upload.single('photo'), async (req, res, next) => {
  // #swagger.tags = ['Keamanan']
  // #swagger.description = 'Endpoint untuk upload file.'
  /*
        #swagger.consumes = ['multipart/form-data']  
        #swagger.produces = ['application/json']
        #swagger.parameters['photo'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
            description: 'photo cover keamanan',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['judul'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'judul keamanan',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['lokasi'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'lokasi',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['deskripsi'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'deskripsi',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['tanggal'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'tanggal',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['notlp'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'notlp',
        }
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['status'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'status',
        } 
  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Keamanan" },
      description: "Output API untuk objek Keamanan" } */

  try {
    const { judul, lokasi, deskripsi, tanggal, notlp, status, fotoBase64 } =
      req.body;
    let foto = '';

    if (req.file) {
      foto = `https://056b-2404-c0-2420-00-dca4-6ce7.ngrok-free.app/uploads/${req.file.filename}`; // set foto to filename of uploaded photo
    }

    const newKeamanan = await Keamanan.create({
      judul,
      lokasi,
      deskripsi,
      tanggal,
      notlp,
      status,
      foto,
    });

    res.status(201).json({
      code: 201,
      status: 'success',
      message: 'Data keamanan berhasil disimpan',
      data: newKeamanan,
    });
  } catch (error) {
    console.error('Error while saving Keamanan:', error);
    res.status(500).json({
      code: 500,
      status: 'error',
      message: 'An error occurred while saving the data',
      error: error.message,
    });
  }
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['Keamanan']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi Keamanan.',
              required: true,
              schema: { $ref: "#/definitions/Keamanan" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Keamanan" },
      description: "Output API untuk objek Keamanan" } */
  let id = req.params.id;
  var ret = await Keamanan.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['Keamanan']
  // #swagger.description = 'Endpoint untuk menghapus Keamanan.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Keamanan" },
      description: "Output API untuk objek Keamanan" } */
  let id = req.params.id;
  var ret = await Keamanan.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

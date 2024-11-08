var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const Tanggapan = db.tanggapan;
const upload = require('../middlewares/uploadmodule');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['Tanggapan']
  // #swagger.description = 'Endpoint untuk mengambil semua Tanggapan.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Tanggapans" },
    description: "Output API untuk objek Tanggapan" } */

  var data = await Tanggapan.findAll();
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['Tanggapan']
  // #swagger.description = 'Endpoint untuk mengambil Tanggapan berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Tanggapan" },
    description: "Output API untuk objek Tanggapan" } */
  let id = req.params.id;
  var data = await Tanggapan.findByPk(id);
  res.json(data);
});
router.post('/', upload.single('photo'), async (req, res, next) => {
  // #swagger.tags = ['Tanggapan']
  // #swagger.description = 'Endpoint untuk upload file.'
  /*
        #swagger.consumes = ['multipart/form-data']  
        #swagger.produces = ['application/json']
        #swagger.parameters['photo'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
            description: 'photo cover tanggapan',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['tanggapan'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'tanggapan ',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['deskripsi'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'deskripsi',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['status'] = {
            in: 'formData',
            type: 'integer',
            required: 'true',
            description: 'status',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['selesai'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'selesai',
        } 
  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Tanggapan" },
      description: "Output API untuk objek Tanggapan" } */
  try {
    const { tanggapan, deskripsi, status, selesai, fotoBase64 } = req.body;
    let foto = '';

    if (req.file) {
      foto = `https://97ed-2404-c0-2020-00-6cc-f733.ngrok-free.app/uploads/${req.file.filename}`; // set foto to filename of uploaded photo
    }
    const newTanggapan = await Tanggapan.create({
      tanggapan,
      deskripsi,
      status,
      selesai,
      foto,
    });

    res.status(201).json({
      code: 201,
      status: 'success',
      message: 'Data tanggapan berhasil disimpan',
      data: newTanggapan,
    });
  } catch (error) {
    console.error('Error while saving Tanggapan:', error);
    res.status(500).json({
      code: 500,
      status: 'error',
      message: 'An error occurred while saving the data',
      error: error.message,
    });
  }
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['Tanggapan']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi Tanggapan.',
              required: true,
              schema: { $ref: "#/definitions/Tanggapan" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Tanggapan" },
      description: "Output API untuk objek Tanggapan" } */
  let id = req.params.id;
  var ret = await Tanggapan.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['Tanggapan']
  // #swagger.description = 'Endpoint untuk menghapus Tanggapan.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Tanggapan" },
      description: "Output API untuk objek Tanggapan" } */
  let id = req.params.id;
  var ret = await Tanggapan.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

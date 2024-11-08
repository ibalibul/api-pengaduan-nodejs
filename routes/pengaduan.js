var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const Pengaduan = db.pengaduans;
const upload = require('../middlewares/uploadmodule');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['Pengaduan']
  // #swagger.description = 'Endpoint untuk mengambil semua Pengaduan.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Pengaduan" },
    description: "Output API untuk objek Pengaduan" } */

  var data = await Pengaduan.findAll();
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['Pengaduan']
  // #swagger.description = 'Endpoint untuk mengambil Pengaduan berdasarkan id.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Pengaduan" },
      description: "Output API untuk objek Pengaduan" } */
  let id = req.params.id;
  var data = await Pengaduan.findByPk(id);
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['Pengaduan']
  // #swagger.description = 'Endpoint untuk mengambil Pengaduan berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Pengaduan" },
    description: "Output API untuk objek Pengaduan" } */
  let id = req.params.id;
  var data = await Pengaduan.findByPk(id);
  res.json(data);
});

router.post('/', upload.single('photo'), async (req, res, next) => {
  // #swagger.tags = ['Pengaduan']
  // #swagger.description = 'Endpoint untuk upload file.'
  /*
        #swagger.consumes = ['multipart/form-data']  
        #swagger.produces = ['application/json']
        #swagger.parameters['photo'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
            description: 'photo cover pengaduan',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['Judul'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'judul pengaduan',
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
  */
  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Pengaduan" },
      description: "Output API untuk objek Pengaduan" } */
  try {
    const { Judul, lokasi, deskripsi, tanggal, notlp, status, fotoBase64 } =
      req.body;
    let foto = '';

    if (req.file) {
      foto = `https://97ed-2404-c0-2020-00-6cc-f733.ngrok-free.app/uploads/${req.file.filename}`; // set foto to filename of uploaded photo
    }
    const newPengaduan = await Pengaduan.create({
      Judul,
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
      message: 'Data pengaduan berhasil disimpan',
      data: newPengaduan,
    });
  } catch (error) {
    console.error('Error while saving Pengaduan:', error);
    res.status(500).json({
      code: 500,
      status: 'error',
      message: 'An error occurred while saving the data',
      error: error.message,
    });
  }
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['Pengaduan']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi Pengaduan.',
              required: true,
              schema: { $ref: "#/definitions/Pengaduan" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Pengaduan" },
      description: "Output API untuk objek Pengaduan" } */
  let id = req.params.id;
  var ret = await Pengaduan.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['Pengaduan']
  // #swagger.description = 'Endpoint untuk menghapus Pengaduan.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Pengaduan" },
      description: "Output API untuk objek Pengaduan" } */
  let id = req.params.id;
  var ret = await Pengaduan.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

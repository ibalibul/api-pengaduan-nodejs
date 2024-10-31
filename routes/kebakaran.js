var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const Kebakaran = db.kebakaran;
const upload = require('../middlewares/uploadmodule');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['Kebakaran']
  // #swagger.description = 'Endpoint untuk mengambil semua Kebakaran.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Kebakaran" },
    description: "Output API untuk objek Kebakaran" } */

  var data = await Kebakaran.findAll();
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['Kebakaran']
  // #swagger.description = 'Endpoint untuk mengambil Kebakaran berdasarkan id.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Kebakaran" },
      description: "Output API untuk objek Kebakaran" } */
  let id = req.params.id;
  var data = await Kebakaran.findByPk(id);
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['Kebakaran']
  // #swagger.description = 'Endpoint untuk mengambil Kebakaran berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Kebakaran" },
    description: "Output API untuk objek Kebakaran" } */
  let id = req.params.id;
  var data = await Kebakaran.findByPk(id);
  res.json(data);
});

router.post('/', upload.single('photo'), async (req, res, next) => {
  try {
    const { judul, lokasi, deskripsi, tanggal, notlp, fotoBase64 } = req.body;
    let foto = '';

    if (req.file) {
      foto = `https://97ed-2404-c0-2020-00-6cc-f733.ngrok-free.app/uploads/${req.file.filename}`; // set foto to filename of uploaded photo
    }

    const newKebakaran = await Kebakaran.create({
      judul,
      lokasi,
      deskripsi,
      tanggal,
      notlp,
      foto,
    });

    res.status(201).json({
      code: 201,
      status: 'success',
      message: 'Data kebakaran berhasil disimpan',
      data: newKebakaran,
    });
  } catch (error) {
    console.error('Error while saving Kebakaran:', error);
    res.status(500).json({
      code: 500,
      status: 'error',
      message: 'An error occurred while saving the data',
      error: error.message,
    });
  }
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['Kebakaran']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi Kebakaran.',
              required: true,
              schema: { $ref: "#/definitions/Kebakaran" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Kebakaran" },
      description: "Output API untuk objek Kebakaran" } */
  let id = req.params.id;
  var ret = await Kebakaran.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['Kebakaran']
  // #swagger.description = 'Endpoint untuk menghapus Kebakaran.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Kebakaran" },
      description: "Output API untuk objek Kebakaran" } */
  let id = req.params.id;
  var ret = await Kebakaran.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

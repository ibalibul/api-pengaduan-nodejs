var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const PotensiDesa = db.potensidesa;
const upload = require('../middlewares/uploadmodule');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['PotensiDesa']
  // #swagger.description = 'Endpoint untuk mengambil semua PotensiDesa.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/PotensiDesa" },
    description: "Output API untuk objek PotensiDesa" } */

  var data = await PotensiDesa.findAll();
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['PotensiDesa']
  // #swagger.description = 'Endpoint untuk mengambil PotensiDesa berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/PotensiDesa" },
    description: "Output API untuk objek PotensiDesa" } */
  let id = req.params.id;
  var data = await PotensiDesa.findByPk(id);
  res.json(data);
});

router.post('/', upload.single('photo'), async (req, res, next) => {
  // #swagger.tags = ['PotensiDesa']
  // #swagger.description = 'Endpoint untuk upload file.'
  /*
        #swagger.consumes = ['multipart/form-data']  
        #swagger.produces = ['application/json']
        #swagger.parameters['photo'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
            description: 'photo cover potensidesa',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['nama'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'name potenesidesa',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['deskrpsi'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'deskrpsi',
        } 
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['alamat'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
            description: 'alamat',
        } 
  */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Profile" },
      description: "Output API untuk objek Profile" } */
  try {
    const { nama, deskrpsi, alamat } = req.body;
    let foto = ''; // initialize foto variable

    if (req.file) {
      foto = `https://97ed-2404-c0-2020-00-6cc-f733.ngrok-free.app/uploads/${req.file.filename}`; // set foto to filename of uploaded photo
    }

    const newPotensiDesa = await PotensiDesa.create({
      nama: nama,
      deskrpsi: deskrpsi,
      alamat: alamat,
      foto: foto, // save the filename (or path) of the photo to the database
    });

    res.status(201).json({
      code: 201,
      status: 'success',
      message: 'Data potensi desa berhasil disimpan',
      data: {
        id: newPotensiDesa.id,
        nama: newPotensiDesa.nama,
        deskrpsi: newPotensiDesa.deskrpsi,
        alamat: newPotensiDesa.alamat,
        foto: newPotensiDesa.foto, // sudah berisi URL lengkap foto
        createdAt: newPotensiDesa.createdAt,
        updatedAt: newPotensiDesa.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error while saving PotensiDesa:', error);
    res.status(500).json({
      code: 500,
      status: 'error',
      message: 'An error occurred while saving the data',
      error: error.message,
    });
  }
});

router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['PotensiDesa']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi PotensiDesa.',
              required: true,
              schema: { $ref: "#/definitions/PotensiDesa" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/PotensiDesa" },
      description: "Output API untuk objek PotensiDesa" } */
  let id = req.params.id;
  var ret = await PotensiDesa.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['PotensiDesa']
  // #swagger.description = 'Endpoint untuk menghapus PotensiDesa.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/PotensiDesa" },
      description: "Output API untuk objek PotensiDesa" } */
  let id = req.params.id;
  var ret = await PotensiDesa.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

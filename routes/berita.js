var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const Berita = db.beritas;

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['Berita']
  // #swagger.description = 'Endpoint untuk mengambil semua Berita.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Beritas" },
    description: "Output API untuk objek Berita" } */

  var data = await Berita.findAll();
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['Berita']
  // #swagger.description = 'Endpoint untuk mengambil Berita berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Berita" },
    description: "Output API untuk objek Berita" } */
  let id = req.params.id;
  var data = await Berita.findByPk(id);
  res.json(data);
});
router.post('/', async (req, res, next) => {
  // #swagger.tags = ['Berita']
  // #swagger.description = 'Endpoint untuk membuat berita baru.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi Berita.',
              required: true,
              schema: { $ref: "#/definitions/Berita" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Berita" },
      description: "Output API untuk objek Berita" } */
  var berita = await Berita.create(req.body);
  res.json(berita);
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['Berita']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi Berita.',
              required: true,
              schema: { $ref: "#/definitions/Berita" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Berita" },
      description: "Output API untuk objek Berita" } */
  let id = req.params.id;
  var ret = await Berita.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['Berita']
  // #swagger.description = 'Endpoint untuk menghapus Berita.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Berita" },
      description: "Output API untuk objek Berita" } */
  let id = req.params.id;
  var ret = await Berita.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

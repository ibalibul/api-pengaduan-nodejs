var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const Pengaduan = db.pengaduans;

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
router.post('/', async (req, res, next) => {
  // #swagger.tags = ['Pengaduan']
  // #swagger.description = 'Endpoint untuk membuat pengaduan baru.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi Pengaduan.',
              required: true,
              schema: { $ref: "#/definitions/Pengaduan" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Pengaduan" },
      description: "Output API untuk objek Pengaduan" } */
  var pengaduan = await Pengaduan.create(req.body);
  res.json(pengaduan);
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

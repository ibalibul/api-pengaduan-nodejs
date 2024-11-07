var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const Tanggapan = db.tanggapan;

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
router.post('/', async (req, res, next) => {
  // #swagger.tags = ['Tanggapan']
  // #swagger.description = 'Endpoint untuk membuat tanggapan baru.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi Tanggapan.',
              required: true,
              schema: { $ref: "#/definitions/Tanggapan" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Tanggapan" },
      description: "Output API untuk objek Tanggapan" } */
  var tanggapan = await Tanggapan.create(req.body);
  res.json(tanggapan);
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

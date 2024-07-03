var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const Admin = db.admin;

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['Admin']
  // #swagger.description = 'Endpoint untuk mengambil semua Admin.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Admin" },
    description: "Output API untuk objek Admin" } */

  var data = await Admin.findAll();
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['Admin']
  // #swagger.description = 'Endpoint untuk mengambil Admin berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Admin" },
    description: "Output API untuk objek Admin" } */
  let id = req.params.id;
  var data = await Admin.findByPk(id);
  res.json(data);
});
router.post('/', async (req, res, next) => {
  // #swagger.tags = ['Admin']
  // #swagger.description = 'Endpoint untuk membuat admin baru.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi Admin.',
              required: true,
              schema: { $ref: "#/definitions/Admin" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Admin" },
      description: "Output API untuk objek Admin" } */
  var admin = await Admin.create(req.body);
  res.json(admin);
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['Admin']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi Admin.',
              required: true,
              schema: { $ref: "#/definitions/Admin" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Admin" },
      description: "Output API untuk objek Admin" } */
  let id = req.params.id;
  var ret = await Admin.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['Admin']
  // #swagger.description = 'Endpoint untuk menghapus Admin.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Admin" },
      description: "Output API untuk objek Admin" } */
  let id = req.params.id;
  var ret = await Admin.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

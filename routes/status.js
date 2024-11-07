var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const Status = db.status;
const upload = require('../middlewares/uploadmodule');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['Status']
  // #swagger.description = 'Endpoint untuk mengambil semua Status.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Status" },
    description: "Output API untuk objek Status" } */

  var data = await Status.findAll();
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['Status']
  // #swagger.description = 'Endpoint untuk mengambil Status berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Status" },
    description: "Output API untuk objek Status" } */
  let id = req.params.id;
  var data = await Status.findByPk(id);
  res.json(data);
});

router.post('/', async (req, res, next) => {
  // #swagger.tags = ['Status']
  // #swagger.description = 'Endpoint untuk membuat status baru.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi Status.',
              required: true,
              schema: { $ref: "#/definitions/Status" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Status" },
      description: "Output API untuk objek Status" } */
  var status = await Status.create(req.body);
  res.json(status);
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['Status']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi Status.',
              required: true,
              schema: { $ref: "#/definitions/Status" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Status" },
      description: "Output API untuk objek Status" } */
  let id = req.params.id;
  var ret = await User.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['Status']
  // #swagger.description = 'Endpoint untuk menghapus Status.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Status" },
      description: "Output API untuk objek Status" } */
  let id = req.params.id;
  var ret = await Status.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

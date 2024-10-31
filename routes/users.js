var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const User = db.user;

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint untuk mengambil semua User.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Users" },
    description: "Output API untuk objek User" } */

  var data = await User.findAll();
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint untuk mengambil User berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/User" },
    description: "Output API untuk objek User" } */
  let id = req.params.id;
  var data = await User.findByPk(id);
  res.json(data);
});
router.post('/', async (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint untuk membuat user baru.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi User.',
              required: true,
              schema: { $ref: "#/definitions/User" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/User" },
      description: "Output API untuk objek User" } */
  var user = await User.create(req.body);
  res.json(user);
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi User.',
              required: true,
              schema: { $ref: "#/definitions/User" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/User" },
      description: "Output API untuk objek User" } */
  let id = req.params.id;
  var ret = await User.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint untuk menghapus User.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/User" },
      description: "Output API untuk objek User" } */
  let id = req.params.id;
  var ret = await User.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

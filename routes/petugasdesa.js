var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const PetugasDesa = db.petugasdesa;

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['PetugasDesa']
  // #swagger.description = 'Endpoint untuk mengambil semua PetugasDesa.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/PetugasDesa" },
    description: "Output API untuk objek PetugasDesa" } */

  var data = await PetugasDesa.findAll();
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['PetugasDesa']
  // #swagger.description = 'Endpoint untuk mengambil PetugasDesa berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/PetugasDesa" },
    description: "Output API untuk objek PetugasDesa" } */
  let id = req.params.id;
  var data = await PetugasDesa.findByPk(id);
  res.json(data);
});
router.post('/', async (req, res, next) => {
  // #swagger.tags = ['PetugasDesa']
  // #swagger.description = 'Endpoint untuk membuat petugasdesa baru.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi PetugasDesa.',
              required: true,
              schema: { $ref: "#/definitions/PetugasDesa" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/PetugasDesa" },
      description: "Output API untuk objek PetugasDesa" } */
  var petugasdesa = await PetugasDesa.create(req.body);
  res.json(petugasdesa);
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['PetugasDesa']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi PetugasDesa.',
              required: true,
              schema: { $ref: "#/definitions/PetugasDesa" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/PetugasDesa" },
      description: "Output API untuk objek PetugasDesa" } */
  let id = req.params.id;
  var ret = await PetugasDesa.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['PetugasDesa']
  // #swagger.description = 'Endpoint untuk menghapus PetugasDesa.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/PetugasDesa" },
      description: "Output API untuk objek PetugasDesa" } */
  let id = req.params.id;
  var ret = await PetugasDesa.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

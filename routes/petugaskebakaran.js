var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const PetugasKebakaran = db.petugaskebakarans;

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['PetugasKebakaran']
  // #swagger.description = 'Endpoint untuk mengambil semua PetugasKebakaran.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/PetugasKebakarans" },
    description: "Output API untuk objek PetugasKebakaran" } */

  var data = await PetugasKebakaran.findAll();
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['PetugasKebakaran']
  // #swagger.description = 'Endpoint untuk mengambil PetugasKebakaran berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/PetugasKebakaran" },
    description: "Output API untuk objek PetugasKebakaran" } */
  let id = req.params.id;
  var data = await PetugasKebakaran.findByPk(id);
  res.json(data);
});
router.post('/', async (req, res, next) => {
  // #swagger.tags = ['PetugasKebakaran']
  // #swagger.description = 'Endpoint untuk membuat petugaskebakaran baru.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi PetugasKebakaran.',
              required: true,
              schema: { $ref: "#/definitions/PetugasKebakaran" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/PetugasKebakaran" },
      description: "Output API untuk objek PetugasKebakaran" } */
  var petugaskebakaran = await PetugasKebakaran.create(req.body);
  res.json(petugaskebakaran);
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['PetugasKebakaran']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi PetugasKebakaran.',
              required: true,
              schema: { $ref: "#/definitions/PetugasKebakaran" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/PetugasKebakaran" },
      description: "Output API untuk objek PetugasKebakaran" } */
  let id = req.params.id;
  var ret = await PetugasKebakaran.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['PetugasKebakaran']
  // #swagger.description = 'Endpoint untuk menghapus PetugasKebakaran.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/PetugasKebakaran" },
      description: "Output API untuk objek PetugasKebakaran" } */
  let id = req.params.id;
  var ret = await PetugasKebakaran.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

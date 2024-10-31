var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const PetugasKsK = db.petugasksk;

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['PetugasKsk']
  // #swagger.description = 'Endpoint untuk mengambil semua PetugasKsk.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/PetugasKsks" },
    description: "Output API untuk objek PetugasKsk" } */

  var data = await PetugasKsK.findAll();
  res.json(data);
});
router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['PetugasKsk']
  // #swagger.description = 'Endpoint untuk mengambil PetugasKsk berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/PetugasKsk" },
    description: "Output API untuk objek PetugasKsk" } */
  let id = req.params.id;
  var data = await PetugasKsK.findByPk(id);
  res.json(data);
});
router.post('/', async (req, res, next) => {
  // #swagger.tags = ['PetugasKsk']
  // #swagger.description = 'Endpoint untuk membuat petugasksk baru.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi PetugasKsk.',
              required: true,
              schema: { $ref: "#/definitions/PetugasKsk" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/PetugasKsk" },
      description: "Output API untuk objek PetugasKsk" } */
  var petugasksk = await PetugasKsK.create(req.body);
  res.json(petugasksk);
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['PetugasKsk']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi PetugasKsk.',
              required: true,
              schema: { $ref: "#/definitions/PetugasKsk" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/PetugasKsk" },
      description: "Output API untuk objek PetugasKsk" } */
  let id = req.params.id;
  var ret = await PetugasKsK.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['PetugasKsk']
  // #swagger.description = 'Endpoint untuk menghapus PetugasKsk.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/PetugasKsk" },
      description: "Output API untuk objek PetugasKsk" } */
  let id = req.params.id;
  var ret = await PetugasKsK.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

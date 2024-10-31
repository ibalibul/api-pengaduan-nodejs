var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const StatistikPend = db.statistikpendidikan;

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['StatistikPend']
  // #swagger.description = 'Endpoint untuk mengambil semua StatistikPend.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/StatistikPends" },
    description: "Output API untuk objek StatistikPend" } */

  try {
    // Fetch all entries from the StatistikJenisKelamin table
    const data = await StatistikPend.findAll();

    // Construct the response object
    const response = {
      code: 200,
      status: 'success',
      message: 'Berhasil mendapatkan data statistik Pendidikan',
      data: data.map((item) => ({
        id: item.id,
        sd: item.sd,
        smp: item.smp,
        sma: item.sma,
        smk: item.smk,
        kuliah: item.kuliah,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
    };

    // Send the response
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: 'An error occurred while fetching the data',
      error: error.message,
    });
  }
});

router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['StatistikPend']
  // #swagger.description = 'Endpoint untuk mengambil StatistikPend berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/StatistikPend" },
    description: "Output API untuk objek StatistikPend" } */

  try {
    const id = req.params.id;
    const data = await StatistikPend.findByPk(id);

    if (!data) {
      return res.status(404).json({
        code: 404,
        status: 'error',
        message: 'Data not found',
      });
    }

    const response = {
      code: 200,
      status: 'success',
      message: 'Berhasil mendapatkan data statistik Pendidikan',
      data: {
        id: data.id,
        sd: data.sd,
        smp: data.smp,
        sma: data.sma,
        smk: data.smk,
        kuliah: data.kuliah,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: 'An error occurred while fetching the data',
      error: error.message,
    });
  }
});
router.post('/', async (req, res, next) => {
  // #swagger.tags = ['StatistikPend']
  // #swagger.description = 'Endpoint untuk membuat StatistikPend baru.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi StatistikPend.',
              required: true,
              schema: { $ref: "#/definitions/StatistikPend" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/StatistikPend" },
      description: "Output API untuk objek StatistikPend" } */
  var statistikpend = await StatistikPend.create(req.body);
  res.json(statistikpend);
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['StatistikPend']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi StatistikPend.',
              required: true,
              schema: { $ref: "#/definitions/StatistikPend" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/StatistikPend" },
      description: "Output API untuk objek StatistikPend" } */
  let id = req.params.id;
  var ret = await StatistikPend.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['StatistikPend']
  // #swagger.description = 'Endpoint untuk menghapus StatistikPend.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/StatistikPend" },
      description: "Output API untuk objek StatistikPend" } */
  let id = req.params.id;
  var ret = await StatistikPend.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

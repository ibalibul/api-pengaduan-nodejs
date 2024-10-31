const express = require('express');
const router = express.Router();

const db = require('../models/sqlite.database');
const StatistikJenisKelamin = db.statistikjk;

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['StatistikJk']
  // #swagger.description = 'Endpoint untuk mengambil semua StatistikJk.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/StatistikJks" },
    description: "Output API untuk objek StatistikJk" } */

  try {
    // Fetch all entries from the StatistikJenisKelamin table
    const data = await StatistikJenisKelamin.findAll();

    // Construct the response object
    const response = {
      code: 200,
      status: 'success',
      message: 'Berhasil mendapatkan data statistik jenis kelamin',
      data: data.map((item) => ({
        id: item.id,
        laki_laki: item.laki_laki,
        perempuan: item.perempuan,
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
  // #swagger.tags = ['StatistikJk']
  // #swagger.description = 'Endpoint untuk mengambil StatistikJk berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/StatistikJk" },
    description: "Output API untuk objek StatistikJk" } */

  try {
    const id = req.params.id;
    const data = await StatistikJenisKelamin.findByPk(id);

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
      message: 'Berhasil mendapatkan data statistik Jenis Kelamin',
      data: {
        id: data.id,
        laki_laki: data.laki_laki,
        perempuan: data.perempuan,
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
  // #swagger.tags = ['StatistikJk']
  // #swagger.description = 'Endpoint untuk membuat statistikjk baru.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi StatistikJk.',
              required: true,
              schema: { $ref: "#/definitions/StatistikJk" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/StatistikJk" },
      description: "Output API untuk objek StatistikJk" } */
  var statistikjk = await StatistikJenisKelamin.create(req.body);
  res.json(statistikjk);
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['StatistikJk']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi StatistikJk.',
              required: true,
              schema: { $ref: "#/definitions/StatistikJk" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/StatistikJk" },
      description: "Output API untuk objek StatistikJk" } */
  let id = req.params.id;
  var ret = await StatistikJenisKelamin.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['StatistikJk']
  // #swagger.description = 'Endpoint untuk menghapus StatistikJk.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/StatistikJk" },
      description: "Output API untuk objek StatistikJk" } */
  let id = req.params.id;
  var ret = await StatistikJenisKelamin.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

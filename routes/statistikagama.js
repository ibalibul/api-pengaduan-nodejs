var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const StatistikAgama = db.statistikagama;

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['StatistikAgama']
  // #swagger.description = 'Endpoint untuk mengambil semua StatistikAgama.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/StatistikAgamas" },
    description: "Output API untuk objek StatistikAgama" } */

  try {
    // Fetch all entries from the StatistikJenisKelamin table
    const data = await StatistikAgama.findAll();

    // Construct the response object
    const response = {
      code: 200,
      status: 'success',
      message: 'Berhasil mendapatkan data statistik Pendidikan',
      data: data.map((item) => ({
        id: item.id,
        islam: item.islam,
        kristen: item.kristen,
        katholik: item.katholik,
        hindu: item.hindu,
        budha: item.budha,
        konghucu: item.konghucu,
        kepercayaan: item.kepercayaan,
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
  // #swagger.tags = ['StatistikAgama']
  // #swagger.description = 'Endpoint untuk mengambil StatistikAgama berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/StatistikAgama" },
    description: "Output API untuk objek StatistikAgama" } */

  try {
    const id = req.params.id;
    const data = await StatistikAgama.findByPk(id);

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
        islam: data.islam,
        kristen: data.kristen,
        katholik: data.katholik,
        hindu: data.hindu,
        budha: data.budha,
        konghucu: data.konghucu,
        kepercayaan: data.kepercayaan,
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
  // #swagger.tags = ['StatistikAgama']
  // #swagger.description = 'Endpoint untuk membuat statistikagama baru.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi StatistikAgama.',
              required: true,
              schema: { $ref: "#/definitions/StatistikAgama" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/StatistikAgama" },
      description: "Output API untuk objek StatistikAgama" } */
  var statistikagama = await StatistikAgama.create(req.body);
  res.json(statistikagama);
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['StatistikAgama']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi StatistikAgama.',
              required: true,
              schema: { $ref: "#/definitions/StatistikAgama" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/StatistikAgama" },
      description: "Output API untuk objek StatistikAgama" } */
  let id = req.params.id;
  var ret = await StatistikAgama.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['StatistikAgama']
  // #swagger.description = 'Endpoint untuk menghapus StatistikAgama.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/StatistikAgama" },
      description: "Output API untuk objek StatistikAgama" } */
  let id = req.params.id;
  var ret = await StatistikAgama.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

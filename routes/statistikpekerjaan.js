var express = require('express');
var router = express.Router();

const db = require('../models/sqlite.database');
const StatistikPekerjaan = db.statistikpekerjaan;

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['StatistikPekerjaan']
  // #swagger.description = 'Endpoint untuk mengambil semua StatistikPekerjaan.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/StatistikPekerjaans" },
    description: "Output API untuk objek StatistikPekerjaan" } */
  try {
    // Fetch all entries from the StatistikJenisKelamin table
    const data = await StatistikPekerjaan.findAll();

    // Construct the response object
    const response = {
      code: 200,
      status: 'success',
      message: 'Berhasil mendapatkan data statistik Pendidikan',
      data: data.map((item) => ({
        id: item.id,
        pns: item.pns,
        pegawai_swasta: item.pegawai_swasta,
        wirausaha: item.wirausaha,
        tni: item.tni,
        polri: item.polri,
        buruh: item.buruh,
        tidak_bekerja: item.tidak_bekerja,
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
  // #swagger.tags = ['StatistikPekerjaan']
  // #swagger.description = 'Endpoint untuk mengambil StatistikPekerjaan berdasarkan id.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/StatistikPekerjaan" },
    description: "Output API untuk objek StatistikPekerjaan" } */

  try {
    const id = req.params.id;
    const data = await StatistikPekerjaan.findByPk(id);

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
      message: 'Berhasil mendapatkan data statistik Pekerjaan',
      data: {
        id: data.id,
        pns: data.pns,
        pegawai_swasta: data.pegawai_swasta,
        wirausaha: data.wirausaha,
        tni: data.tni,
        polri: data.polri,
        buruh: data.buruh,
        tidak_bekerja: data.tidak_bekerja,
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
  // #swagger.tags = ['StatistikPekerjaan']
  // #swagger.description = 'Endpoint untuk membuat StatistikPekerjaan baru.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi StatistikPekerjaan.',
              required: true,
              schema: { $ref: "#/definitions/StatistikPekerjaan" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/StatistikPekerjaan" },
      description: "Output API untuk objek StatistikPekerjaan" } */
  var statistikpekerjaan = await StatistikPekerjaan.create(req.body);
  res.json(statistikpekerjaan);
});
router.put('/:id', async (req, res, next) => {
  // #swagger.tags = ['StatistikPekerjaan']
  // #swagger.description = 'Endpoint untuk index http put.'

  /*	#swagger.parameters['data'] = {
              in: 'body',
              description: 'Informasi StatistikPekerjaan.',
              required: true,
              schema: { $ref: "#/definitions/StatistikPekerjaan" }
      } */

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/StatistikPekerjaan" },
      description: "Output API untuk objek StatistikPekerjaan" } */
  let id = req.params.id;
  var ret = await StatistikPekerjaan.update(req.body, { where: { id: id } });
  res.json({ status: ret });
});
router.delete('/:id', async (req, res, next) => {
  // #swagger.tags = ['StatistikPekerjaan']
  // #swagger.description = 'Endpoint untuk menghapus StatistikPekerjaan.'

  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/StatistikPekerjaan" },
      description: "Output API untuk objek StatistikPekerjaan" } */
  let id = req.params.id;
  var ret = await StatistikPekerjaan.destroy({ where: { id: id } });
  res.json({ status: ret });
});

module.exports = router;

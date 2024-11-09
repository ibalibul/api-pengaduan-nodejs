var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const db = require('../models/sqlite.database');
const Admin = db.admin;

// Hardcoded admin credentials for testing (gunakan ini hanya untuk pengembangan, bukan untuk produksi)
const HARDCODED_ADMIN_EMAIL = 'admin@gmail.com';
const HARDCODED_ADMIN_PASSWORD = 'admin123';

// Secret key for signing JWTs (keep this secure and don't hard-code it in production)
const JWT_SECRET_KEY = 'your_jwt_secret_key';

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['Admin']
  // #swagger.description = 'Endpoint untuk mengambil semua Admin.'

  /* #swagger.responses[200] = { 
    schema: { "$ref": "#/definitions/Admins" },
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
router.post('/login', async (req, res, next) => {
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
  const { email, password } = req.body;

  try {
    if (
      email === HARDCODED_ADMIN_EMAIL &&
      password === HARDCODED_ADMIN_PASSWORD
    ) {
      // Generate JWT
      const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET_KEY, {
        expiresIn: '1h',
      });

      res.status(200).json({
        data: {
          access_token: token,
          nama: 'admin',
        },
        message: 'Login successful',
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
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

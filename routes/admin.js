var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const db = require('../models/sqlite.database');
const Admin = db.admin;

const HARDCODED_ADMIN_EMAIL = 'admin@gmail.com  ';
const HARDCODED_ADMIN_PASSWORD = 'admin123';

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
  // #swagger.description = 'Endpoint untuk login admin.'

  /* #swagger.parameters['data'] = {
    in: 'body',
    description: 'Informasi login Admin (email dan password).',
    required: true,
    schema: {
      type: "object",
      properties: {
        email: { type: "string", example: "admin@gmail.com" },
        password: { type: "string", example: "admin123" }
      }
    }
  } */

  /* #swagger.responses[200] = { 
    description: "Login berhasil, mengembalikan token JWT.",
    schema: {
      type: "object",
      properties: {
        token: { type: "string", example: "jwt.token.here" }
      }
    }
  } */

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password diperlukan' });
  }

  // Cek apakah email yang dikirimkan cocok dengan yang sudah hardcoded (untuk testing)
  if (
    email === HARDCODED_ADMIN_EMAIL &&
    password === HARDCODED_ADMIN_PASSWORD
  ) {
    // Generate token jika email dan password cocok
    const token = jwt.sign(
      { email: HARDCODED_ADMIN_EMAIL },
      JWT_SECRET_KEY,
      { expiresIn: '1h' } // Token berlaku selama 1 jam
    );
    return res.json({ token });
  }

  try {
    // Jika menggunakan database, kita bisa mencari admin berdasarkan email
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({ message: 'Admin tidak ditemukan' });
    }

    // Membandingkan password yang dimasukkan dengan yang ada di database (password terenkripsi)
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Jika valid, buat token JWT
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      JWT_SECRET_KEY,
      { expiresIn: '1h' } // Token berlaku selama 1 jam
    );

    // Kirim token ke klien
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
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

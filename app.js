var express = require('express');
require('express-async-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

global.__basedir = __dirname;

var app = express();

// database
// sqlite
const dbsqlite = require('./models/sqlite.database');
dbsqlite.sequelize
  .sync()
  .then(() => {
    console.log('Synced sqlite db.');
  })
  .catch((err) => {
    console.log('Failed to sync sqlite db: ' + err.message);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var beritaRouter = require('./routes/berita');
var pengaduanRouter = require('./routes/pengaduan');
var petugasDesaRouter = require('./routes/petugasdesa');
var adminRouter = require('./routes/admin');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/berita', beritaRouter);
app.use('/pengaduan', pengaduanRouter);
app.use('/petugasdesa', petugasDesaRouter);
app.use('/admin', adminRouter);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 404
app.use(async (req, res, next) => {
  return res.status(404).json({ status: 404, message: 'Not Found' });
});

// 500 - Any Server error
app.use(async (err, req, res, next) => {
  console.log(err);
  return res
    .status(500)
    .json({ status: 500, message: 'Internal Server error' });
});

module.exports = app;

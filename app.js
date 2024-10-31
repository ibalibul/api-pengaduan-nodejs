var express = require('express');
require('express-async-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const bodyParser = require('body-parser');

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
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// Add custom header middleware here
app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', '69420');
  next();
});
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var beritaRouter = require('./routes/berita');
var pengaduanRouter = require('./routes/pengaduan');
var petugasDesaRouter = require('./routes/petugasdesa');
var adminRouter = require('./routes/admin');
var potensidesaRouter = require('./routes/potensidesa');
var statistikJkRouter = require('./routes/statistikjk');
var statistikPendidikanRouter = require('./routes/statistikpendidikan');
var statistikPekerjaanRouter = require('./routes/statistikpekerjaan');
var statistikAgamaRouter = require('./routes/statistikagama');
var petugasksk = require('./routes/petugasksk');
var petugaskebakaran = require('./routes/petugaskebakaran');
var keamanan = require('./routes/keamanan');
var kebakaran = require('./routes/kebakaran');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/berita', beritaRouter);
app.use('/pengaduan', pengaduanRouter);
app.use('/petugasdesa', petugasDesaRouter);
app.use('/admin', adminRouter);
app.use('/potensidesa', potensidesaRouter);
app.use('/statistikJk', statistikJkRouter);
app.use('/statistikpendidikan', statistikPendidikanRouter);
app.use('/statistikpekerjaan', statistikPekerjaanRouter);
app.use('/statistikagama', statistikAgamaRouter);
app.use('/petugasksk', petugasksk);
app.use('/petugaskebakaran', petugaskebakaran);
app.use('/keamanan', keamanan);
app.use('/kebakaran', kebakaran);

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

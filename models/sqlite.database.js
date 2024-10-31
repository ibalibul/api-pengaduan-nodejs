'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: global.__basedir + '/data/database.sqlite',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.beritas = require('./berita.model.js')(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);
db.pengaduans = require('./pengaduan.model.js')(sequelize, Sequelize);
db.tanggapan = require('./tanggapan.model.js')(sequelize, Sequelize);

db.tanggapan.hasMany(db.pengaduans);
db.pengaduans.belongsTo(db.tanggapan);

db.admin = require('./admin.model.js')(sequelize, Sequelize);
db.petugasdesa = require('./petugasdesa.model.js')(sequelize, Sequelize);
db.petugasiuran = require('./petugasiuran.model.js')(sequelize, Sequelize);
db.potensidesa = require('./potensidesa.model.js')(sequelize, Sequelize);
db.iuranbulanan = require('./iuranbulanan.js')(sequelize, Sequelize);
db.statistikjk = require('./statistikJK.model.js')(sequelize, Sequelize);
db.statistikpekerjaan = require('./statistikPekerjaan.model.js')(
  sequelize,
  Sequelize
);
db.statistikpendidikan = require('./statistikPendidikan.model.js')(
  sequelize,
  Sequelize
);
db.statistikagama = require('./StatistikAgama.model.js')(sequelize, Sequelize);
db.petugasksk = require('./petugasksk.model.js')(sequelize, Sequelize);
module.exports = db;
db.petugaskebakarans = require('./petugaskebakaran.model.js')(
  sequelize,
  Sequelize
);
module.exports = db;
db.keamanan = require('./keamanan.model.js')(sequelize, Sequelize);
db.kebakaran = require('./kebakaran.model.js')(sequelize, Sequelize);

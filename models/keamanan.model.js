module.exports = function (sequelize, Sequalize) {
  var Keamanan = sequelize.define('Keamanan', {
    judul: Sequalize.STRING,
    lokasi: Sequalize.STRING,
    deskripsi: Sequalize.STRING,
    tanggal: Sequalize.STRING,
    notlp: Sequalize.INTEGER,
    foto: Sequalize.STRING,
    status: Sequalize.INTEGER,
  });
  return Keamanan;
};

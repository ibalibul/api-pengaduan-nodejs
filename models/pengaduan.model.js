module.exports = function (sequelize, Sequalize) {
  var Pengaduan = sequelize.define('Pengaduan', {
    Judul: Sequalize.STRING,
    lokasi: Sequalize.STRING,
    deskripsi: Sequalize.STRING,
    tanggal: Sequalize.STRING,
    notlp: Sequalize.INTEGER,
    foto: Sequalize.INTEGER,
  });
  return Pengaduan;
};

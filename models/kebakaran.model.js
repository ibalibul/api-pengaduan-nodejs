module.exports = function (sequelize, Sequalize) {
  var Kebakaran = sequelize.define('Kebakaran', {
    judul: Sequalize.STRING,
    lokasi: Sequalize.STRING,
    deskripsi: Sequalize.STRING,
    tanggal: Sequalize.STRING,
    notlp: Sequalize.INTEGER,
    foto: Sequalize.STRING,
    status: Sequalize.INTEGER,
  });
  return Kebakaran;
};

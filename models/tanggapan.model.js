module.exports = function (sequelize, Sequalize) {
  var Tanggapan = sequelize.define('Tanggapan', {
    foto: Sequalize.STRING,
    tanggapan: Sequalize.STRING,
    deskripsi: Sequalize.STRING,
    status: Sequalize.INTEGER,
    selesai: Sequalize.STRING,
  });
  return Tanggapan;
};

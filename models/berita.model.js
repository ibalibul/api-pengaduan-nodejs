module.exports = function (sequelize, Sequalize) {
  var Berita = sequelize.define('Berita', {
    nikpengaduan: Sequalize.STRING,
    judulpengaduan: Sequalize.STRING,
    lokasipengaduan: Sequalize.STRING,
    deskripsipengaduan: Sequalize.STRING,
  });
  return Berita;
};

module.exports = function (sequelize, Sequalize) {
  var PotensiDesa = sequelize.define('PotensiDesa', {
    nama: Sequalize.STRING,
    deskrpsi: Sequalize.STRING,
    alamat: Sequalize.STRING,
    foto: Sequalize.INTEGER,
  });
  return PotensiDesa;
};

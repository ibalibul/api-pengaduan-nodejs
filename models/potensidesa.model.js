module.exports = function (sequelize, Sequelize) {
  var PotensiDesa = sequelize.define('PotensiDesa', {
    nama: Sequelize.STRING,
    deskrpsi: Sequelize.STRING,
    alamat: Sequelize.STRING,
    foto: Sequelize.INTEGER,
  });
  return PotensiDesa;
};

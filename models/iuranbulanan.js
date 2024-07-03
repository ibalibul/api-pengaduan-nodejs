module.exports = function (sequelize, Sequalize) {
  var IuranBulanan = sequelize.define('IuranBulanan', {
    nama: Sequalize.STRING,
    totaltagihan: Sequalize.INTEGER,
    totalbayar: Sequalize.INTEGER,
    tunggakan: Sequalize.INTEGER,
  });
  return IuranBulanan;
};

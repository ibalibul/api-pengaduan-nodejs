module.exports = function (sequelize, Sequalize) {
  var Tanggapan = sequelize.define('Tanggapan', {
    status: Sequalize.INTEGER,
    tanggapan: Sequalize.STRING,
  });
  return Tanggapan;
};

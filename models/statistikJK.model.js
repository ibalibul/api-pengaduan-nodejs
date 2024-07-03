module.exports = function (sequelize, Sequalize) {
  var StatistikJK = sequelize.define('StatistikJenisKelamin', {
    laki_laki: Sequalize.INTEGER,
    perempuan: Sequalize.INTEGER,
  });
  return StatistikJK;
};

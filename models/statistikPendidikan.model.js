module.exports = function (sequelize, Sequalize) {
  var StatistikPendidikan = sequelize.define('StatistikPendidikan', {
    sd: Sequalize.INTEGER,
    smp: Sequalize.INTEGER,
    sma: Sequalize.INTEGER,
    smk: Sequalize.INTEGER,
    kuliah: Sequalize.INTEGER,
  });
  return StatistikPendidikan;
};

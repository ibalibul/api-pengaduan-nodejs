module.exports = function (sequelize, Sequalize) {
  var StatistikPendidikan = sequelize.define('StatistikPendidikan', {
    sd: Sequalize.STRING,
    smp: Sequalize.STRING,
    sma: Sequalize.STRING,
    smk: Sequalize.STRING,
    kuliah: Sequalize.STRING,
  });
  return StatistikPendidikan;
};

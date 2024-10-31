module.exports = function (sequelize, Sequalize) {
  var StatistikAgama = sequelize.define('StatistikAgama', {
    islam: Sequalize.INTEGER,
    kristen: Sequalize.INTEGER,
    katholik: Sequalize.INTEGER,
    hindu: Sequalize.INTEGER,
    budha: Sequalize.INTEGER,
    konghucu: Sequalize.INTEGER,
    kepercayaan: Sequalize.INTEGER,
  });
  return StatistikAgama;
};

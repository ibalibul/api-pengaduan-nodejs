module.exports = function (sequelize, Sequalize) {
  var StatistikPekerjaan = sequelize.define('StatistikPekerjaan', {
    pns: Sequalize.INTEGER,
    pegawai_swasta: Sequalize.INTEGER,
    wirausaha: Sequalize.INTEGER,
    tni: Sequalize.INTEGER,
    polri: Sequalize.INTEGER,
    buruh: Sequalize.INTEGER,
    tindak_bekerja: Sequalize.INTEGER,
  });
  return StatistikPekerjaan;
};

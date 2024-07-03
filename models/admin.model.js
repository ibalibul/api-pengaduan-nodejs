module.exports = function (sequelize, Sequalize) {
  var Admin = sequelize.define('Admin', {
    nama: Sequalize.STRING,
    email: Sequalize.STRING,
    password: Sequalize.STRING,
  });
  return Admin;
};

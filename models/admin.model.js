module.exports = function (sequelize, Sequelize) {
  var Admin = sequelize.define('Admin', {
    nama: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING, // Store hashed password
  });
  return Admin;
};

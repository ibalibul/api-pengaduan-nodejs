module.exports = function (sequelize, Sequalize) {
  var PetugasIuran = sequelize.define('PetugasDesa', {
    nama: Sequalize.STRING,
    email: Sequalize.STRING,
    password: Sequalize.STRING,
  });
  return PetugasIuran;
};

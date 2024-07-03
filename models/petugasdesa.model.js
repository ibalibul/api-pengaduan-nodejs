module.exports = function (sequelize, Sequalize) {
  var PetugasDesa = sequelize.define('PetugasDesa', {
    nama: Sequalize.STRING,
    email: Sequalize.STRING,
    password: Sequalize.STRING,
  });
  return PetugasDesa;
};

module.exports = function (sequelize, Sequalize) {
  var PetugasKsk = sequelize.define('PetugasKsk', {
    nama: Sequalize.STRING,
    email: Sequalize.STRING,
    password: Sequalize.STRING,
  });
  return PetugasKsk;
};

module.exports = function (sequelize, Sequalize) {
  var PetugasKebakaran = sequelize.define('PetugasKebakaran', {
    nama: Sequalize.STRING,
    email: Sequalize.STRING,
    password: Sequalize.STRING,
  });
  return PetugasKebakaran;
};

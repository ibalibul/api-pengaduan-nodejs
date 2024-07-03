module.exports = function (sequelize, Sequalize) {
  var User = sequelize.define('User', {
    name: Sequalize.STRING,
    email: Sequalize.STRING,
    password: Sequalize.STRING,
    notlp: Sequalize.INTEGER,
  });
  return User;
};

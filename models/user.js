const Sequelize   = require('sequelize'),
      sequelize   = require('./config');

const User = sequelize.define("User", {
    UserId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.INTEGER,
    username: Sequelize.STRING,
    password: Sequelize.STRING
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = User;

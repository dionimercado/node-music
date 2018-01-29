const Sequelize   = require('sequelize'),
      sequelize   = require('./config');

const User = sequelize.define('User', {
    ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    username: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true 
      }
    },
    password: Sequelize.STRING,
    salt: Sequelize.STRING
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = User;

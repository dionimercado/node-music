const Sequelize   = require('sequelize'),
      path        = require('path');


const sequelize = new Sequelize('Music', 'michael', null, {
  host: process.env.IP,
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../public/data/chinook.sqlite'),
  operatorsAliases: false
});

module.exports = sequelize;
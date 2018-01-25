const Sequelize   = require('sequelize'),
      sequelize   = require('./config');

const Artist = sequelize.define("Artist", {
    ArtistId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: Sequelize.STRING
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = Artist;

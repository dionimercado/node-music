const Sequelize   = require('sequelize'),
      sequelize   = require('./config');

const Album = sequelize.define("Album", {
    AlbumId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // Name: Sequelize.STRING,
    ArtistId: Sequelize.INTEGER,
    Title: Sequelize.STRING
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = Album;

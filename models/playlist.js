const Sequelize   = require('sequelize'),
      sequelize   = require('./config');

const Playlist = sequelize.define("Playlist", {
    PlaylistId: {
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

module.exports = Playlist;

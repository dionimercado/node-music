const Sequelize   = require('sequelize'),
      sequelize   = require('./config');

const Track = sequelize.define("Track", {
    TrackId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: Sequelize.STRING,
    AlbumId: Sequelize.INTEGER,
    MediaTypeId: Sequelize.INTEGER,
    GenreId: Sequelize.INTEGER,
    Composer: Sequelize.STRING,
    Milliseconds: Sequelize.INTEGER,
    UnitPrice: Sequelize.FLOAT,
    createdBy: Sequelize.INTEGER
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = Track;

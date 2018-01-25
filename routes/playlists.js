const sequelize = require('../models/config'),
      Playlist     = require('../models/playlist');

module.exports = app => {
  app.get('/playlists', (req, res) => {
    sequelize.query(`
      SELECT * FROM Playlist
    `, 
    {model: Playlist, raw: true})
      // .spread((results, metadata) => {
      //   // Raw query - use spread
      //   console.log(results.toJSON);
      // });
      .then(playlists => {
        res.render('playlists', {playlists});
        console.log(playlists);
      });
  });

  app.get('/playlists/:id', (req, res) => {
    const SQL = `
      SELECT t.Name Track, t.UnitPrice Price, g.Name Genre, ar.Name Artist, a.Title Album FROM Track t
      INNER JOIN Album a USING(AlbumId)
      INNER JOIN Artist ar USING(ArtistId)
      INNER JOIN Genre g USING(GenreId)
      WHERE AlbumId = ${req.params.id}
    `;
    
    sequelize.query(SQL, {model: Playlist, raw: true})
      .then(tracks => {
        res.render('album', {tracks, albumName: tracks[0].Album, title: tracks[0].Album}); 
        console.log(tracks);
      });
        
  });
};
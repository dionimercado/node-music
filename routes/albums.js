const sequelize = require('../models/config'),
      Album     = require('../models/album');

module.exports = app => {
  app.get('/albums', (req, res) => {
    sequelize.query(`
      SELECT a.*, ar.Name Artist, COUNT(TrackId) Tracks, SUM(Milliseconds / (1000 * 60)) % 60 as Minutes FROM Album a
      INNER JOIN Track USING(AlbumId)
      INNER JOIN Artist ar USING(ArtistId)
      GROUP BY AlbumId
      ORDER BY RANDOM()
      LIMIT 15
    `, 
    {model: Album, raw: true})
      // .spread((results, metadata) => {
      //   // Raw query - use spread
      //   console.log(results.toJSON);
      // });
      .then(albums => {
        res.render('albums', {albums, isLoggedIn: req.isAuthenticated()});
        console.log(albums);
      });
  });

  app.get('/album/:id', (req, res) => {
    const SQL = `
      SELECT t.Name Track, t.UnitPrice Price, g.Name Genre, ar.Name Artist, a.Title Album FROM Track t
      INNER JOIN Album a USING(AlbumId)
      INNER JOIN Artist ar USING(ArtistId)
      INNER JOIN Genre g USING(GenreId)
      WHERE AlbumId = ${req.params.id}
    `;
    
    sequelize.query(SQL, {model: Album, raw: true})
      .then(tracks => {
        res.render('album', {tracks, albumName: tracks[0].Album, title: tracks[0].Album, isLoggedIn: req.isAuthenticated()}); 
      });
        
  });
};
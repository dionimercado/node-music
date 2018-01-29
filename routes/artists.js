const sequelize = require('../models/config'),
      Artist     = require('../models/artist');

module.exports = app => {
  app.get('/artists', (req, res) => {
    sequelize.query(`
      SELECT *, COUNT(*) TotalAlbums FROM Artist
      INNER JOIN Album a USING(ArtistId)
      GROUP BY ArtistId
      ORDER BY RANDOM()
      LIMIT 15
    `, 
    {model: Artist, raw: true})
      // .spread((results, metadata) => {
      //   // Raw query - use spread
      //   console.log(results.toJSON);
      // });
      .then(artists => {
        res.render('artists', { artists, isLoggedIn: req.isAuthenticated() });
        console.log(artists);
      });
  });

  app.get('/artist/:id', (req, res) => {
    const SQL = `
      SELECT t.Name Track, t.UnitPrice Price, g.Name Genre, ar.Name Artist, a.Title Album FROM Track t
      INNER JOIN Album a USING(AlbumId)
      INNER JOIN Artist ar USING(ArtistId)
      INNER JOIN Genre g USING(GenreId)
      WHERE ArtistId = ${req.params.id}
      --GROUP BY ArtistId
    `;
    
    sequelize.query(SQL, {model: Artist, raw: true})
      .then(tracks => {
        res.render('artist', {tracks, ArtistName: tracks[0].Artist, title: tracks[0].Artist, isLoggedIn: req.isAuthenticated()}); 
        // res.render('artist', {tracks}); 
        console.log(tracks);
      });
        
  });
};
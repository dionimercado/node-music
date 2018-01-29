const sequelize = require('../models/config'),
      Track     = require('../models/track');

module.exports = app => {
  app.get('/tracks', (req, res) => {
    sequelize.query(`
      SELECT t.Name TrackName, ar.Name ArtistName,  ar.ArtistId, a.Title AlbumTitle, a.AlbumId, (Milliseconds / (1000 * 60)) % 60 as Minutes 
      FROM Track t
      INNER JOIN Album a USING(AlbumId)
      INNER JOIN Artist ar USING(ArtistId)
      LIMIT 15
    `, 
    {model: Track, raw: true})
      // .spread((results, metadata) => {
      //   // Raw query - use spread
      //   console.log(results.toJSON);
      // });
      .then(tracks => {
        res.render('tracks', {tracks, isLoggedIn: req.isAuthenticated()});
        console.log(tracks);
      });
  });

  app.get('/tracks/page/:id', (req, res) => {
    sequelize.query(`show tables`, 
    {model: Track, raw: true})
      // .spread((results, metadata) => {
      //   // Raw query - use spread
      //   console.log(results.toJSON);
      // });
      .then(tracks => {
        res.render('tracks', {tracks, isLoggedIn: req.isAuthenticated()});
        console.log(tracks);
      });
  });
  
  app.get('/track/:id/edit', (req, res) => {
    Track.findById(req.params.id).then( track => {
      res.render('track-edit', {TrackId: req.params.id});
    });
  });

};
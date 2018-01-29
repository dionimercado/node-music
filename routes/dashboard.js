const sequelize = require('../models/config'),
      authMiddleware = require('../middlewares/auth'),
      User = require('../models/user'),
      Album = require('../models/album'),
      Track = require('../models/track');

module.exports = app => {

  
  app.get('/dashboard', authMiddleware.loginRequired, (req,res) => {
    User.findById(req.user.ID).then( user => {
      res.render('dashboard', {user, isLoggedIn: req.isAuthenticated()});
    });
  });

  app.get('/dashboard/tracks', (req, res) => {
    sequelize.query(`
      SELECT t.Name TrackName, ar.Name ArtistName, t.UnitPrice, ar.ArtistId, a.Title AlbumTitle, a.AlbumId, (Milliseconds / (1000 * 60)) % 60 as Minutes, t.createdBy 
      FROM Track t
      INNER JOIN Album a USING(AlbumId)
      INNER JOIN Artist ar USING(ArtistId)
      --WHERE createdBy = ${req.user.ID}
      WHERE t.createdBy = 1
      LIMIT 15
    `, 
    {model: Track, raw: true})
      .then(tracks => {
        res.render('dashboard-tracks', {tracks, isLoggedIn: req.isAuthenticated()});
      });
  });
  
  app.get('/dashboard/tracks/add', authMiddleware.loginRequired, (req, res) => {
    Album.findAll({
      order: [
        ['Title', 'ASC']
        // ['name', 'ASC']
      ]
    }).then( albums => {
      res.render('add-track', {albums, isLoggedIn: req.isAuthenticated()});
    });
  });
  
  app.post('/dashboard/tracks/add', authMiddleware.loginRequired, (req, res) => {
    Track.create({
      Name: req.body.Name,
      AlbumId: req.body.AlbumId,
      MediaTypeId: 1,
      GenreId: 1,
      Milliseconds: 600000,
      UnitPrice: 0.99,
      createdBy: req.user.ID
    }).then( () => {
      res.redirect('/dashboard/tracks');
    });
  });
};
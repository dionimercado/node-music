const bcrypt          = require('bcrypt'),
      User            = require('../models/user'),
      authMiddleware  = require("../middlewares/auth"),
      passport        = require("passport"),
      LocalStrategy   = require('passport-local').Strategy;

module.exports = app => {
  
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy( (username, password, done) => {
      User.findOne({
        where: {
          'username': username
        }
      }).then( user => {
        if (user == null) {
          return done(null, false, { message: 'Incorrect credentials.' });
        }
        
        const hashedPassword = bcrypt.hashSync(password, user.salt);
        
        if (user.password === hashedPassword) {
          return done(null, user);
        }
        
        return done(null, false, { message: 'Incorrect credentials.' });
      });
    }
  ));

  passport.serializeUser( (user, done) => {
    done(null, user.ID);
  });

  passport.deserializeUser( (id, done) => {
    User.findOne({
      where: {
        'ID': id
      }
    }).then( user => {
      if (user == null) {
        done(new Error('Wrong user id.'));
      }
      
      done(null, user);
    });
  });

  
  app.get('/signin', (req, res) => {
    if( req.isAuthenticated() ) {
      res.redirect('/');
    }else{
      res.render('signin');
    }
  });
  
  app.post('/signin', passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/signin',
      failureFlash: true 
  }));

  app.get('/signup', (req,res) => {
      res.render('signup');
  });
    
  app.post('/signup', (req, res) => {
    const { username, password, password2 } = req.body;
    // const username = req.body.username;
    // const password = req.body.password;
    // const password2 = req.body.password2;
    
    if (!username || !password || !password2) {
      req.flash('error', "Please, fill in all the fields.");
      console.log('error', "Please, fill in all the fields.");
      res.redirect('/signup');
    }
    
    if (password !== password2) {
      req.flash('error', "Please, enter the same password twice.");
      console.log('error', "Please, enter the same password twice.");
      res.redirect('/signup');
    }
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    const newUser = {
      username: username,
      salt: salt,
      password: hashedPassword
    };

    User.create(newUser).then( () => {
      res.redirect('/signin');
    }).catch( error => {
      req.flash('error', "Please, choose a different username.");
      console.log('error', "Please, choose a different username.");
      res.redirect('/signup');
    });

  });
  
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/signin');
  });
};

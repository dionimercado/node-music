const express     = require('express'),
      path        = require('path'),
      logger      = require('morgan'),
      methodOverride = require("method-override"),
      bodyParser  = require('body-parser'),
      exphbs      = require('express-handlebars'),
      User        = require('./routes/user'),
      Playlists   = require('./routes/playlists'),
      Artists     = require('./routes/artists'),
      Albums      = require('./routes/albums'),
      Tracks      = require('./routes/tracks'),
      Dashboard      = require('./routes/dashboard'),
      session = require('cookie-session'),
      flash = require('connect-flash'),
      passport = require('passport');
      

const app = express();

app.use(logger('dev'));

app.engine('hbs', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(session({secret: 'shhhhhhh!'}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', (req, res) => {
  res.render('home', { isLoggedIn: req.isAuthenticated() });
});

// send flash messages to all routes
app.use( (req, res, next) => {
  res.locals.message = req.flash('message');
  next();
});

User(app);
Albums(app);
Tracks(app);
Playlists(app);
Artists(app);

Dashboard(app);



app.listen(process.env.PORT, () => {
  console.log(`Server running...`);
})
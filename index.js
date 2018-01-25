const express     = require('express'),
      path        = require('path'),
      bodyParser  = require('body-parser'),
      logger      = require('morgan'),
      exphbs      = require('express-handlebars'),
      Sequelize   = require('sequelize'),
      Playlists       = require('./routes/playlists'),
      Albums       = require('./routes/albums');
      

const app = express();

app.use(logger('dev'));

app.engine('hbs', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

Albums(app);
Playlists(app);



app.listen(process.env.PORT, () => {
  console.log(`Server running...`);
})
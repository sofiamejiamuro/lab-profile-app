require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors')
const session      = require('express-session')
const passport     = require("./config/passport");
const flash        = require("connect-flash");





mongoose
  .connect(process.env.DB, {useNewUrlParser: true,  useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin:process.env.ORIGIN,
    credentials: true
  }))
  app.use(flash());
  app.use(session({
    secret: "perrin",
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());

  app.use(passport.session());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'))
app.use('/new-project', require('./routes/newproject'))
app.use('/proyid', require('./routes/proyid'))
app.use('/delete', require('./routes/deleteelement'))
module.exports = app;



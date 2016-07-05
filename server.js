var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var app = express();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./models/user');
require('./passport')(passport);
var routes = require('./routes');

mongoose.connect('mongodb://localhost/passport', 
  function(err, res) {
    if(err) throw err;
    console.log('Conectado con éxito a la BD');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//	configs
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', routes.index);
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', 
    failureRedirect: '/login' }));

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
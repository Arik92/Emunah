var express = require('express');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/emunah');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Configure passport and session middleware
app.use(expressSession({
  secret: 'thisIsASecret',
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(express.static('node_modules'));

// Configure passport-local to use user model for authentication
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

app.listen(process.env.PORT || '8000', function(){
  console.log("8000. BAruh Hashem!")
});

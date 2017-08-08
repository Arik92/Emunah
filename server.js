var express = require('express');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var localStrategy = require('passport-local').Strategy;
var User = require('./models/userModel');
var userRoutes = require('./Routes/userRoutes');
var app = express();

//mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/emunah');


mongoose.connect(process.env.CONNECTION_STRING||"mongodb://localhost/users");


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

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/users', userRoutes);

app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(process.env.PORT || '8000', function(){
  console.log("8000. BAruh Hashem!")
});

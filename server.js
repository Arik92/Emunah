var express = require('express');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
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

// Sendmail route
app.post('/sendmail', function(req, res){
    var options = {
        auth: {
            api_key: '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'
        }
    }
    var mailer = nodemailer.createTransport(sgTransport(options));
    mailer.sendMail(req.body, function(error, info){
        if(error) {
            res.status('401').json({err: info});
        } else{
            res.status('200').json({success: true});
        }
    });
});

app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(process.env.PORT || '8000', function(){
  console.log("8000. BAruh Hashem!")
});

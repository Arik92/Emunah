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
mongoose.connect("mongodb://localhost/users");


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

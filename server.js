var express = require('express');
var expressSession = require('express-session');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport    = require('./models/passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var userRoutes = require('./Routes/userRoutes');
var articleRoutes = require('./Routes/articleRoutes');
var app = express();
//app.use(cors());
//app.options('*', cors());

mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/emunah');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Configure passport and session middleware
/*app.use(expressSession({
  secret: 'thisIsASecret',
  resave: false,
  saveUninitialized: false })); */
app.use(passport.initialize());
//app.use(passport.session());
app.use(express.static('public'));
app.use(express.static('node_modules'));

/*passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); */
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
// "https://localhost:8000"
app.use(function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "localhost, https://localhost:8000, hebcal.com, https://emunah.herokuapp.com");          		
		res.header("Access-Control-Allow-Credentials", "true");
		res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");   
		res.header("Access-Control-Allow-Headers", " Authorization, Origin ,Accept, x-access-token, X-Requested-With, Content-Type, Access-Control-Request-Methods, Access-Control-Request-Headers");		
        next();
  }); 
app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(process.env.PORT || '8000', function(){
  console.log("8000. Baruh Hashem!")
});

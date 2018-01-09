var compression = require('compression');
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
var https = require('https');
var fs = require('fs');


//app.use(cors());
//app.options('*', cors());

var https_options = {
  cert: fs.readFileSync('/home/emunahadmin/Emunah/www_emunah_com.crt'),
  key: fs.readFileSync('/home/emunahadmin/Emunah/emunah.com.key'),
  ca: fs.readFileSync('/home/emunahadmin/Emunah/www_emunah_com.ca-bundle')
}; 
mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/emunah');

app.use(compression());
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
	    res.header("Access-Control-Allow-Origin", "localhost, https://localhost:8000, hebcal.com, https://emunah.com");          		
		res.header("Access-Control-Allow-Credentials", "true");
		res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");   
		res.header("Access-Control-Allow-Headers", " Authorization, Origin ,Accept, x-access-token, X-Requested-With, Content-Type, Access-Control-Request-Methods, Access-Control-Request-Headers");		
        next();
  }); 
app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

https.createServer(https_options, app).listen(443)
/*https.createServer(https_options, function (req, res) {
 res.writeHead(200);
 //res.end("Welcome to Node.js HTTPS Servern");
}).listen(443)*/


const devPort = '80';
// app.listen(process.env.PORT || devPort, function(){
//   console.log("listening on port "+devPort+". Baruh Hashem!")
// });


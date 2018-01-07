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

/*var https_options = {
  key: fs.readFileSync("./ssl/private/www.emunah.com.key"),
  cert: fs.readFileSync("./ssl/certs/_wildcard__emunahchannel_com_a4b5d_07cd9_1527379199_78a339de7dcaa3117c1eb45b2f3647cf.crt"),
  ca: [
          fs.readFileSync('./ssl/certs/emunah_com_c59a4_d82cf_1507939199_dc96dbbca4e29f8fea2c739b236cd50c.crt'),
          fs.readFileSync('./ssl/certs/emunah_com_d35ca_52989_1546387199_356128196545f8e79624ac9487c209ac.crt') 
       ]

}; */
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

const devPort = '80';
/*https.createServer(https_options, function (req, res) {
 res.writeHead(200);
 res.end("Welcome to Node.js HTTPS Servern");
}).listen(8443)*/
app.listen(process.env.PORT || devPort, function(){
  console.log("listening on port "+devPort+". Baruh Hashem!")
});

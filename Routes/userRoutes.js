var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var passport = require('passport');
var config = require('../public/js/config.js');
var jwt    = require('jsonwebtoken');
var secret = 'urgonnadieclown865626';

///////////////////////////////////////////////// TWILIO ///////////////////////////////////////////////////////////
// Twilio Credentials
const accountSid = config.TWILIO_Sid;
const authToken = config.TWILIO_Token;
 const client = require('twilio')(accountSid, authToken);
router.post('/whatsapp/:phone', function(req, res, next) {
var phonesArray = ['+972509717677','+18182884886'];
  console.log("req params", req.params.phone);
  for (var i=0;i<phonesArray.length;i++) {
  client.messages.create(
    {
      to: phonesArray[i],
      from: '+13158474678',
      body: "Hey please add '"+req.params.phone+"' to the awesome group :)",
    },
    (err, message) => {
      if (err) {
        console.log("something is wrong", err)
      } else {
        if (i===phonesArray.length-1) {
          res.send(req.params.phone);
        }
      }//else
    }//callback
  );//create
}//for
})
///////////////////////////////////////////////// TWILIO ///////////////////////////////////////////////////////////
//////////////////////////////////////////// facebook routes ///////////////////////////////////////////////////////
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

  router.get('/facebook/callback',
    passport.authenticate('facebook', {session: false, failureRedirect: '/' }),
    function(req, res) {
      console.log(req.user);
      // Successful authentication, redirect home.
      res.redirect('/authorization?token=' + req.user.token + "&name=" + req.user.name);  });
  // http://localhost:8000/users/users
  //user registration route  
//////////////////////////////////////////// facebook routes ///////////////////////////////////////////////////////
router.post('/users', function(req, res){
    var user = new User();
	console.log("user routes user request obj, ", req.body);
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.image = req.body.image;// this doesnt do anything. needs UPLOAD
    if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
      res.json({ success: false, message: 'Ensure Username, Email and Password were provided' });
    } else {
        user.save(function(err, newUser){
          if (err) {
            res.json({ success: false, message: 'Username or Email already exist' });
          } else {
            res.json({ success: true, message: 'User created!' });
          }
        });
      }
  });
  router.post('/authenticate', function(req, res) {
    User.findOne({ username: req.body.username }).select('email username password _id').exec(function(err, user){
      if (err) throw err;
      if (!user) {
        res.json({ success: false, message: 'could not authenticate user' });
      } else if (user) {
        if (req.body.password) {
          var validPassword = user.comparePassword(req.body.password);
        } else {
          res.json({ success: false, message: 'No Password provided' });
        }
        if (!validPassword) {
          res.json({ success: false, message: 'could not authenticate password' });
        } else {
          var token = jwt.sign({ username: user.username, email: user.email, id: user._id }, secret, { expiresIn: '72h' } );
		  
		   res.setHeader("Access-Control-Allow-Origin", "localhost, https://localhost:8000, hebcal.com, www.hebcal.com, https://www.hebcal.com, https://www.emunah.com, https://emunah.com");          		
			res.setHeader("Access-Control-Allow-Credentials", "true");
			res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");   
			res.setHeader("Access-Control-Allow-Headers", " Authorization, Origin ,Accept, X-Requested-With, Content-Type, Access-Control-Request-Methods, Access-Control-Request-Headers");		
          res.json({ success: true, message: 'User authenticated', token: token });
        }
      }
    });
  });
  
  router.use(function (req, res, next) {
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    if (token) {
      // verify a token symmetric
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.json({ success: false, message: 'token invalid' });
        } else {
			console.log("decoded", decoded);
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.json({ success: false, message: 'No token provided' });
    }
  });

router.get('/searchByName/:name', function(req, res, next){
    User.findOne({username: req.params.name}, function(err, user){
      if (err) {
        console.log(err);
      } else {
        res.send(user);
      }//else
    })//findCb
  }) // get user by name
  
router.post('/register', function(req, res, next) {
  User.register(new User({ username: req.body.username, password: req.body.password, email: req.body.email }), req.body.pass, function(err, user) {
    if (err) {
      console.log('Error registering!', err);
      return next(err);
    }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      res.send(req.user);
    });
  });
});

 router.post('/currentUser', function(req, res) {
	 console.log("REQUEST");
    res.send(req.decoded);
  });
router.post('/login', passport.authenticate('local'), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send(req.user);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.send('Logged Out');
});

module.exports = router;

var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var passport = require('passport');
var config = require('../public/js/config.js');

// Twilio Credentials
const accountSid = config.TWILIO_Sid;
const authToken = config.TWILIO_Token;

// require the Twilio module and create a REST client
 const client = require('twilio')(accountSid, authToken);
router.post('/whatsapp/:phone', function(req, res, next) {
var phonesArray = ['+972509717677','+18182884886'];
  console.log("req params", req.params.phone);
  for (var i=0;i<phonesArray.length;i++) {
  client.messages.create(
    {
      to: phonesArray[i],
      from: '+12248084204',
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

router.post('/register', function(req, res, next) {
  User.register(new User({ username: req.body.email, email: req.body.fname }), req.body.pass, function(err, user) {
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
router.get('/currentUser', function(req, res){
  if (req.user) {
    res.send(req.user);
  } else {
    res.send(null);
  }

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

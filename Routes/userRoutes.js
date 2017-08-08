var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var passport = require('passport');
// Twilio Credentials
const accountSid = 'AC5c7b6a96a552fb968930b3c9da6eac27';
const authToken = '251646d5e8bcbb3d5882db002697aa50';
// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);
router.post('/whatsapp', function(req, res, next) {
  client.messages.create(
    {
      to: '+972509717677',
      from: '+12248084204',
      body: "'"+req.body.phone+"'",
    },
    (err, message) => {
      if (err) {
        console.log("something is wrong", err)
      } else {
        console.log('bomb has been planted');
      }//else
    }//callback
  );//create
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

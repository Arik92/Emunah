var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var User   = require('./userModel');
var jwt    = require('jsonwebtoken');
if (process.env.NODE_ENV === 'production') {
   callbackURL = "https://emunah.com/users/facebook/callback";
  } else {
   callbackURL = "http://localhost:8000/users/facebook/callback";
  }
passport.use(new FacebookStrategy({
      clientID: '969749053191443',
      clientSecret: '44d30070ff0521f8a3b9e2da5c21faf7',
      callbackURL: "https://emunah.com/users/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
      //code to check database goes here
      User.findOne({'socialId': profile.id}, function(err, user){
        if (err) {
          console.error(err);
        } if (!user) {
          user = new User({
            socialId: profile.id,
            email: profile.emails ? profile.emails[0].value : "",
            provider: 'facebook',
            username: profile.displayName
          });
        } else {
          console.log("this user already exists in mongo!");
        }// else user exists in db. Still fetches it
        user.save(function(err, newUser) {
          if (err) {
            console.error(err);
          } else {
            var token = jwt.sign({
            id: newUser.id,
            name: newUser.username,
          }, 'thisIsTopSecret', { expiresIn: "7d" });
          return done(null, { token: token, name: newUser.username});
          }//else
        })//save CB
      })//findOne CB
    }))
module.exports = passport;

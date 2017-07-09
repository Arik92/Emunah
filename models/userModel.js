var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var plm = require('passport-local-mongoose');

var userSchema = new Schema ({
  state: String, // NOTE: possible states are: standard, pro, premium?
  firstName: String,
  lastName: String,
  password: String, //NOTE: should I really store password here?
  email: String,
  address: String,
  city: String,
  state: String,
  country: String,
  zip: Number
});

userSchema.plugin(plm);
var user = mongoose.model("User", userSchema);
module.exports = user;

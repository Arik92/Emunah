var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var plm = require('passport-local-mongoose');

var userSchema = new Schema ({
  state: String, // NOTE: possible states are: standard, pro, premium?
  fname: String,
  lname: String,
  pass: String, //NOTE: should I really store password here?
  email: String,
  address: String,
  city: String,
  province: String,
  country: String,
  zip: Number
});

userSchema.plugin(plm);
var user = mongoose.model("User", userSchema);
module.exports = user;

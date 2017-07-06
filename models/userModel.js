var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
  state: String, // NOTE: possible states are: standard, pro, premium?
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  address: String
});


var user = mongoose.model("User", userSchema);
module.exports = user;

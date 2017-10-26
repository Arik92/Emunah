var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema ({
  title: String,
  publisher: String,
  contentDelta: Object,
  contentHtml: String,
  image: String,
  tags: [String],
  date: String,
  isPrivate: Boolean
});

var article = mongoose.model("Article", articleSchema);
module.exports = article;

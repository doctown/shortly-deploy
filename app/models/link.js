var db = require('../config');
var crypto = require('crypto');

var linkSchema = new db.Schema({
  url: String,
  baseUrl: String,
  code: Number,
  title: String,
  visits: Number
});

var Link = db.model('Link', linkSchema);

linkSchema.pre('save', function(next) {
  var code = createSha(this.url);
  this.code = code;
  next();
});

var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

module.exports = Link;

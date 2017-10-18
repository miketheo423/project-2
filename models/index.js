var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/watch_this");

module.exports.User = require('./user.js');
module.exports.Movie = require('./movie.js');
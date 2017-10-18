// var db = require('../models');

let discoverMovies = function(req, res) {
	res.render('discover-movies');
};



module.exports = {
	discoverMovies: discoverMovies
};
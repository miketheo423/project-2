// var db = require('../models');
 

 function discoverMovies(req, res, next) {
	res.render('discover-movies');
}



module.exports = {
	discoverMovies: discoverMovies
};
// var db = require('../models');
 

 function discoverMovies(req, res, next) {
 	console.log(req.user);
	res.render('discover-movies', req.user);
}



module.exports = {
	discoverMovies: discoverMovies
};
// var db = require('../models');
 

 function discoverMovies(req, res, next) {
 	console.log(req.user);
	res.render('discover-movies', req.user);
}

function discoverShows(req, res, next) {
	console.log(req.user);
	res.render('discover-shows', req.user);
}



module.exports = {
	discoverMovies: discoverMovies,
	discoverShows: discoverShows
};
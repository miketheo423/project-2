// var db = require('../models');
 

 function discoverMovies(req, res, next) {
	res.render('discover-movies', req.user);
}

function discoverShows(req, res, next) {
	res.render('discover-shows', req.user);
}

function mediaProfile(req, res, next) {
	res.render('media-profile', req.user);
}



module.exports = {
	discoverMovies: discoverMovies,
	discoverShows: discoverShows,
	mediaProfile: mediaProfile
};
// var db = require('../models');
const axios = require('axios');


 function discoverMovies(req, res, next) {
	res.render('discover-movies', req.user);
}

function discoverShows(req, res, next) {
	res.render('discover-shows', req.user);
}

function movieProfile(req, res, next) {
	let mediaId = req.query;
	axios.get('https://api.themoviedb.org/3/movie/' + mediaId.id +'?api_key=868e357d0f927691ad60e3d98a0ecde4&language=en-US')
	.then(function(response) {	
	res.render('movie-profile', {response});
	});
}

function tvProfile(req, res, next) {
	let mediaId = req.query;
	axios.get('https://api.themoviedb.org/3/tv/' + mediaId.id +'?api_key=868e357d0f927691ad60e3d98a0ecde4&language=en-US')
	.then(function(response) {
	res.render('tv-profile', {response});
	});
}


module.exports = {
	discoverMovies: discoverMovies,
	discoverShows: discoverShows,
	movieProfile: movieProfile,
	tvProfile: tvProfile
};
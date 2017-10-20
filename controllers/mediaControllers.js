var db = require('../models');

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

function queuedMovies(req, res, next) {
	console.log(req.user.local.email);
	db.User.findOne({'local.email' : req.user.local.email}, function(err, data){
	if (err) throw err;
	res.render('queued-movies', {data});
});
}

function queuedShows(req, res, next) {
	res.render('queued-shows');
}


module.exports = {
	discoverMovies: discoverMovies,
	discoverShows: discoverShows,
	movieProfile: movieProfile,
	tvProfile: tvProfile,
	queuedMovies: queuedMovies,
	queuedShows: queuedShows
};
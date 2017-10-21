var db = require('../models');
const axios = require('axios');
const request = require('request');


function discoverMovies(req, res, next) {
	res.render('discover-movies', req.user);
}

function discoverShows(req, res, next) {
	res.render('discover-shows', req.user);
}


// Movie profile controller
function movieProfile(req, res, next) {
	let mediaId = req.query;
	axios.get('https://api.themoviedb.org/3/movie/' + mediaId.id + '?api_key=868e357d0f927691ad60e3d98a0ecde4&language=en-US')
	.then(function(response) {	
	res.render('movie-profile', {response});
	});
}

// Add movie controller
function addMovieToQueue(req, res, next) {
	console.log("route hit");
	let mediaId = req.query;
	axios.get('https://api.themoviedb.org/3/movie/' + mediaId.id + '?api_key=868e357d0f927691ad60e3d98a0ecde4&language=en-US')
	.then(function(response) {
	db.User.findOne({'local.email' : req.user.local.email}, function(err, data) {
		let movies = data.queuedMovies;
		let movieId = JSON.stringify(response.data.id);
		let newMovie = new db.Movie ({
					id: response.data.id,
					title: response.data.title,
					poster_path: response.data.poster_path,
		});
		console.log(newMovie);
		let results = movies.filter(function(movie) {
			if (movie.id.includes(movieId)) {
				return true;
			}
			 return false;
		});
		console.log(results);
		if(results.length == 0) {
			req.user.queuedMovies.push(newMovie);
			req.user.save();
		}
		});
	});
}

function tvProfile(req, res, next) {
	let mediaId = req.query;
	axios.get('https://api.themoviedb.org/3/tv/' + mediaId.id +'?api_key=868e357d0f927691ad60e3d98a0ecde4&language=en-US')
	.then(function(response) {
	res.render('tv-profile', {response});
	});
}

function addShowToQueue(req, res, next) {
	console.log("route hit");
	let mediaId = req.query;
	axios.get('https://api.themoviedb.org/3/tv/' + mediaId.id + '?api_key=868e357d0f927691ad60e3d98a0ecde4&language=en-US')
	.then(function(response) {
	db.User.findOne({'local.email' : req.user.local.email}, function(err, data) {
		let shows = data.queuedShows;
		let showId = JSON.stringify(response.data.id);
		let newShow = new db.Show ({
					id: response.data.id,
					name: response.data.name,
					poster_path: response.data.poster_path,
		});
		console.log(newShow);
		let results = shows.filter(function(show) {
			if (show.id.includes(showId)) {
				return true;
			}
			 return false;
		});
		console.log(results);
		if(results.length == 0) {
			req.user.queuedShows.push(newShow);
			req.user.save();
		}
		});
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
	console.log(req.user.local.email);
	db.User.findOne({'local.email' : req.user.local.email}, function(err, data){
	if (err) throw err;
	res.render('queued-shows', {data});
});
}


module.exports = {
	discoverMovies: discoverMovies,
	discoverShows: discoverShows,
	movieProfile: movieProfile,
	tvProfile: tvProfile,
	queuedMovies: queuedMovies,
	queuedShows: queuedShows,
	addMovieToQueue: addMovieToQueue,
	addShowToQueue: addShowToQueue
};
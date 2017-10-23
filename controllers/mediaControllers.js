var db = require('../models');
const axios = require('axios');
const request = require('request');
const apiKey = "868e357d0f927691ad60e3d98a0ecde4";


function discoverMovies(req, res, next) {
	res.render('discover-movies', req.user);
}

function discoverShows(req, res, next) {
	res.render('discover-shows', req.user);
}

// Movie profile controller
function movieProfile(req, res, next) {
	let mediaId = req.query;
	axios.get('https://api.themoviedb.org/3/movie/' + mediaId.id + '?api_key=' + apiKey + '')
	.then(function(response, user) {	
	res.render('movie-profile', {response});
	});
}

// Add movie to queue controller
function addMovieToQueue(req, res, next) {
	let mediaId = req.query;
	axios.get('https://api.themoviedb.org/3/movie/' + mediaId.id + '?api_key=' + apiKey + '')
	.then(function(response) {
		db.User.findOne({'local.email' : req.user.local.email}, function(err, data) {
			let movies = data.queuedMovies;
			let movieId = JSON.stringify(response.data.id);
			let newMovie = new db.Movie ({
						id: response.data.id,
						title: response.data.title,
						poster_path: response.data.poster_path,
						comment: "",
						rating: ""
			});
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

// Add movie to watched controller
function addMovieToWatched(req, res, next) {
	console.log("route hit");
	let queryId = req.query.id;
	console.log(queryId);
		db.User.findOne({'local.email' : req.user.local.email}, function(err, data) {
			let queuedMovies = data.queuedMovies;
			let watchedMovies = data.watchedMovies;
				for (let i = 0; i < queuedMovies.length; i++) {
					if (queuedMovies[i].id == queryId) {
						console.log(queuedMovies[i]);
						req.user.watchedMovies.push(queuedMovies[i]);
						req.user.queuedMovies.splice(i, 1);
						req.user.save();
						res.render('queued-movies', {data});
					}
				}
		});
}

// Delete movie from queue
function deleteMovieFromQueue(req, res, next) {
	console.log("route hit");
	let queryId = req.query.id;
	console.log(queryId);
		db.User.findOne({'local.email' : req.user.local.email}, function(err, data) {
			let queuedMovies = data.queuedMovies;
			let watchedMovies = data.watchedMovies;
				for (let i = 0; i < queuedMovies.length; i++) {
					if (queuedMovies[i].id == queryId) {
						console.log(queuedMovies[i]);
						req.user.queuedMovies.splice(i, 1);
						req.user.save();
						res.render('queued-movies', {data});
					}
				}
		});
}

// Delete movie from watched
function deleteMovieFromWatched(req, res, next) {
	console.log("route hit");
	let queryId = req.query.id;
	console.log(queryId);
		db.User.findOne({'local.email' : req.user.local.email}, function(err, data) {
			let queuedMovies = data.queuedMovies;
			let watchedMovies = data.watchedMovies;
				for (let i = 0; i < watchedMovies.length; i++) {
					if (watchedMovies[i].id == queryId) {
						console.log(watchedMovies[i]);
						req.user.watchedMovies.splice(i, 1);
						req.user.save();
						res.render('watched-movies', {data});
					}
				}
		});
}

// Leave a comment on a movie
function addMovieComment(req, res, next) {
	console.log("route hit");
	let queryId = req.query.id;
	let commentMovie = req.body.comment;
	console.log(commentMovie);
	console.log(queryId);
		db.User.findOne({'local.email' : req.user.local.email}, function(err, data) {
			let queuedMovies = data.queuedMovies;
			let watchedMovies = data.watchedMovies;
				for (let i = 0; i < watchedMovies.length; i++) {
					if (watchedMovies[i].id == queryId) {
						// console.log(watchedMovies[i]);
						req.user.watchedMovies[i].comment = commentMovie;
						req.user.save();
						res.render('watched-movies', {data});
					}
				}
		});
}


function tvProfile(req, res, next) {
	let mediaId = req.query;
	axios.get('https://api.themoviedb.org/3/tv/' + mediaId.id +'?api_key=' + apiKey + '')
	.then(function(response) {
	res.render('tv-profile', {response});
	});
}

function addShowToQueue(req, res, next) {
	let mediaId = req.query;
	axios.get('https://api.themoviedb.org/3/tv/' + mediaId.id + '?api_key=' + apiKey + '')
	.then(function(response) {
		db.User.findOne({'local.email' : req.user.local.email}, function(err, data) {
			let shows = data.queuedShows;
			let showId = JSON.stringify(response.data.id);
			let newShow = new db.Show ({
						id: response.data.id,
						name: response.data.name,
						poster_path: response.data.poster_path,
						comment: "",
						rating: ""
			});
			let results = shows.filter(function(show) {
				if (show.id.includes(showId)) {
					return true;
				}
				 return false;
			});
			if(results.length == 0) {
				req.user.queuedShows.push(newShow);
				req.user.save();
			}
		});
	});
}

// Add show to watched controller//////////////////////////
function addShowToWatched(req, res, next) {
	console.log("route hit");
	let queryId = req.query.id;
	console.log(queryId);
		db.User.findOne({'local.email' : req.user.local.email}, function(err, data) {
			let queuedShows = data.queuedShows;
			let watchedShows = data.watchedShows;
				for (let i = 0; i < queuedShows.length; i++) {
					if (queuedShows[i].id == queryId) {
						console.log(queuedShows[i]);
						req.user.watchedShows.push(queuedShows[i]);
						req.user.queuedShows.splice(i, 1);
						req.user.save();
						res.render('queued-shows', {data});
					}
				}
		});

}

// Delete show from queue
function deleteShowFromQueue(req, res, next) {
	console.log("route hit");
	let queryId = req.query.id;
	console.log(queryId);
		db.User.findOne({'local.email' : req.user.local.email}, function(err, data) {
			let queuedShows = data.queuedShows;
			let watchedShows = data.watchedShows;
				for (let i = 0; i < queuedShows.length; i++) {
					if (queuedShows[i].id == queryId) {
						console.log(queuedShows[i]);
						req.user.queuedShows.splice(i, 1);
						req.user.save();
						res.render('queued-shows', {data});
					}
				}
		});
}

// Delete show from watched
function deleteShowFromWatched(req, res, next) {
	console.log("route hit");
	let queryId = req.query.id;
	console.log(queryId);
		db.User.findOne({'local.email' : req.user.local.email}, function(err, data) {
			let queuedShows = data.queuedShows;
			let watchedShows = data.watchedShows;
				for (let i = 0; i < watchedShows.length; i++) {
					if (watchedShows[i].id == queryId) {
						console.log(watchedShows[i]);
						req.user.watchedShows.splice(i, 1);
						req.user.save();
						res.render('watched-shows', {data});
					}
				}
		});
}

// Leave a comment on a show
function addShowComment(req, res, next) {
	console.log("route hit");
	let queryId = req.query.id;
	let commentShow = req.body.comment;
	console.log(commentShow);
	console.log(queryId);
		db.User.findOne({'local.email' : req.user.local.email}, function(err, data) {
			let queuedShows = data.queuedShows;
			let watchedShows = data.watchedShows;
				for (let i = 0; i < watchedShows.length; i++) {
					if (watchedShows[i].id == queryId) {
						// console.log(watchedMovies[i]);
						req.user.watchedShows[i].comment = commentShow;
						req.user.save();
						res.render('watched-movies', {data});
					}
				}
		});
}

function queuedMovies(req, res, next) {
	db.User.findOne({'local.email' : req.user.local.email}, function(err, data){
		if (err) throw err;
		res.render('queued-movies', {data});
	});
}

function queuedShows(req, res, next) {
	db.User.findOne({'local.email' : req.user.local.email}, function(err, data){
		if (err) throw err;
		res.render('queued-shows', {data});
	});
}

function watchedMovies(req, res, next) {
	db.User.findOne({'local.email' : req.user.local.email}, function(err, data){
		if (err) throw err;
		res.render('watched-movies', {data});
	});
}

function watchedShows(req, res, next) {
	db.User.findOne({'local.email' : req.user.local.email}, function(err, data){
		if (err) throw err;
		res.render('watched-shows', {data});
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
	addShowToQueue: addShowToQueue,
	addMovieToWatched: addMovieToWatched,
	addShowToWatched: addShowToWatched,
	watchedMovies: watchedMovies,
	watchedShows: watchedShows,
	deleteMovieFromQueue: deleteMovieFromQueue,
	deleteShowFromQueue: deleteShowFromQueue,
	deleteMovieFromWatched: deleteMovieFromWatched,
	deleteShowFromWatched: deleteShowFromWatched,
	addMovieComment: addMovieComment,
	addShowComment: addShowComment
};
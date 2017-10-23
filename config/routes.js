const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const usersController = require('../controllers/users');
const staticsController = require('../controllers/statics');
const mediaController = require('../controllers/mediaControllers');


function authenticatedUser(req, res, next) {
	// If user is authenticated then continue execution
	if (req.isAuthenticated()) return next();
	// Otherwise direct request back to the homepage
	res.redirect('/');
}

// Main page route
router.route('/')
	.get(staticsController.home);

// Signup route
router.route('/signup')
	.get(usersController.getSignup)
	.post(usersController.postSignup);

// Login route
router.route('/login')
	.get(usersController.getLogin)
	.post(usersController.postLogin);

// Logout route
router.route('/logout')
	.get(usersController.getLogout);

// Discover movies page route
router.route('/discover-movies')
 	.get(mediaController.discoverMovies);

// Discover shows page route
router.route('/discover-shows')
	.get(mediaController.discoverShows);

// Movie-profile page
router.route('/movie-profile')
	.get(mediaController.movieProfile)
	.post(mediaController.addMovieToQueue);

// TV-profile page
router.route('/tv-profile')
	.get(mediaController.tvProfile)
	.post(mediaController.addShowToQueue);

// Queued movies page
router.route('/queued-movies')
	.get(mediaController.queuedMovies)
	.post(mediaController.addMovieToWatched)
	.delete(mediaController.deleteMovieFromQueue);


// Queued shows page
router.route('/queued-shows')
	.get(mediaController.queuedShows)
	.post(mediaController.addShowToWatched)
	.delete(mediaController.deleteShowFromQueue);

// Watched movies page
router.route('/watched-movies')
.get(mediaController.watchedMovies)
.delete(mediaController.deleteMovieFromWatched);

// Watched shows page
router.route('/watched-shows')
.get(mediaController.watchedShows)
.delete(mediaController.deleteShowFromWatched);


	
module.exports = router;
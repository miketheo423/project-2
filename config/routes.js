const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const usersController = require('../controllers/users');
const staticsController = require('../controllers/statics');
const movieController = require('../controllers/movieControllers');

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
 	.get(movieController.discoverMovies);
	
module.exports = router;
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const usersController = require('../controllers/users');
const staticsController = require('../controllers/statics');
const movieController = require('../controllers/movieControllers');

// Main page route
router.route('/')
	.get(staticsController.home);

// Signup route
router.route('/signup')
	.get(staticsController.signup);

// Login route
router.route('/login')
	.get(staticsController.login);

// Discover movies page route
router.get('/discover-movies', movieController.discoverMovies);
	
module.exports = router;
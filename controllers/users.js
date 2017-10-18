var passport = require('passport');

// GET /signup
function getSignup(request, response, next) {
	response.render('signup', {message: request.flash('signupMessage')});
}

// POST /signup
function postSignup(request, response, next) {
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect: '/discover-movies',
		failureRedirect: '/signup',
		failureFlash: true
	});
	return signupStrategy(request, response, next);
}

// GET /login
function getLogin(request, response) {
	response.render('login', {message: request.flash('loginMessage')});
}

// POST /login
function postLogin(request, response, next) {
	let loginStrategy = passport.authenticate('local-login', {
		successRedirect: '/discover-movies',
		failureRedirect: '/login',
		failureFlash: true
	});
	return loginStrategy(request, response, next);
}

// Get /logout
function getLogout(request, response, next) {
	request.logout();
	response.redirect('/');
}

// Secret Page
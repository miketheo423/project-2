var passport = require('passport');

// GET /signup
function getSignup(request, response, next) {
	response.render('signup', {message: request.flash('signupMessage')});
}

// POST /signup

// GET /login

// POST /login

// Get /logout

// Secret Page
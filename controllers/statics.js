// GET /
function home(req, res) {
	res.render('index');
}

// GET /login
function login(req, res) {
	res.render('login');
}

// Get /signup
function signup(req, res) {
	res.render('signup');
}

module.exports = {
	home: home,
	login: login,
	signup: signup
};
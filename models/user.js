const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
let Movie = require('./movie.js');
let Show = require('./show.js');

let User = mongoose.Schema({
	local: {
		email: String,
		password: String
	},
	queuedMovies: [Movie.schema],
	queuedShows: [Show.schema],
	watchedMovies: [Movie.schema],
	watchedShows: [Show.schema]
});


User.methods.encrypt = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);
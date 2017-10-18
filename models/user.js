const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let UserSchema = mongoose.Schema({
	local: {
		email: String,
		password: String
	},
	movies: [MovieSchema]
});

let User = mongoose.model('User', UserSchema);

module.exports = User;
const mongoose = require('mongoose');

let MovieSchema = mongoose.Schema({
		id: String,
		title: String,
		poster_path: String,
		comment: String,
		rating: String
});

let Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
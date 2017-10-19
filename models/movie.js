const mongoose = require('mongoose');

let MovieSchema = mongoose.Schema({
		title: String,
		poster_path: String,
		overview: String
});

let Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
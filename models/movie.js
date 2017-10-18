const mongoose = require('mongoose');

let MovieSchema = mongoose.Schema({
		name: String,
		
});

let Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
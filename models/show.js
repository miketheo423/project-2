const mongoose = require('mongoose');

let ShowSchema = mongoose.Schema({
		id: String,
		name: String,
		poster_path: String,
		comment: String,
		rating: String
});

let Show = mongoose.model('Show', ShowSchema);

module.exports = Show;
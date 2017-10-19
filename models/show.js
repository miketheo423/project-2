const mongoose = require('mongoose');

let ShowSchema = mongoose.Schema({
		title: String,
		poster_path: String,
		overview: String
});

let Show = mongoose.model('Show', ShowSchema);

module.exports = Show;
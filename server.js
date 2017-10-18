// Set up express
const express = require('express');
const app = express();

// Set up bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

// Serve static files from public folder
app.use(express.static(__dirname + '/public'));



// Set up ejs
app.set('views', __dirname + "/views");
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// //Route for discover page
// app.get('/discover', function(req, res) {
// 	res.render('discover');
// });

// Require all the routes
let routes = require('./config/routes');
app.use(routes);

// Start server
app.listen(process.env.PORT || 3000, function () {
	console.log('Express server is up and running on http://localhost:3000/');
});
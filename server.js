var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// Sets up body parser
app.use(bodyParser.urlencoded({ extended: true}));

// Connect to the DB
mongoose.connect(	process.env.MONGODB_URI || 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  'mongodb://localhost/watch_this'); 


// Serve static files from public folder
app.use(express.static(__dirname + '/public'));

// Set up ejs
app.set('views', __dirname + "/views");
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(session({ secret: 'Watch This' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

// Require passport
require('./config/passport')(passport);


// Require all the routes
let routes = require('./config/routes');
app.use(routes);

// Start server
app.listen(process.env.PORT || 3000, function () {
	console.log('Express server is up and running on http://localhost:3000/');
});
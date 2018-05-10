// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
const flash = require('express-flash');
app.use(flash());
var session = require('express-session');
// more new code:
app.use(session({
  secret: 'keyboardkittehohhhhhhyyeaaaahhhhh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
// Require path
var path = require('path');
// adding Mongoose
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quote_dojo');
// Mongoose schema
var QuoteSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please enter a name"], minlength: [6, "min length 6 characters"]},
    quote: { type: String, required: [true, "Please enter a quote"], minlength: [10," min length 10 characters"]}
},
{timestamp:true});
mongoose.model('Quote', QuoteSchema); 
var Quote = mongoose.model('Quote');

// Use native promises
mongoose.Promise = global.Promise;

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

// Routes moved to routes.js 
require('./server/config/routes.js')(app)

  
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})

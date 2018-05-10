var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const flash = require('express-flash');
app.use(flash());
var session = require('express-session');
app.use(session({
  secret: 'keyboardkittehohhhhhhyyeaaaahhhhh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quote_dojo');

// Use native promises for Mongoose
mongoose.Promise = global.Promise;


app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

// Routes moved to routes.js 
require('./server/config/routes.js')(app)


app.listen(8000, function() {
    console.log("listening on port 8000");
})

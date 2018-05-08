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
    name: { type: String, required: true, minlength: 6},
    quote: { type: String, required: true, minlength: 10}
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
// Routes
// Root Request
app.get('/', function(req, res) {
  res.render('index');
})
app.get('/quotes', function(req, res){
  Quote.find({}, function(err, quotes) {
    if (err) {
      console.log("We have an error!", err);
      for(var key in err.errors){
          req.flash('quoteErrors', err.errors[key].message);
      }
      res.redirect('/');
    }
   else {
    res.render('quotes', {quotes: quotes});
   }
  }) 
})

app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    var quote = new Quote({name: req.body.name, quote: req.body.quote});
    quote.save(function(err) {
      // if there is an error console.log that something went wrong!
      console.log("hello");
      if(err) {
        console.log('something went wrong');
        for(var key in err.errors){
          req.flash('errors', err.errors[key].message);
        }
        res.redirect("/");
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a quote!');
        res.redirect('/quotes');
      }
    })
  })  

  
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})

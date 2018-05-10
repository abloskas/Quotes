// Root Request

const mongoose = require('mongoose');
const quotes = require('../controllers/quotes')
Quote = mongoose.model('Quote')
module.exports = function(app){
app.get('/', function(req, res) {
    quotes.index(req, res);
  })
  app.get('/quotes', function(req, res){
    quotes.quote(req, res);
  })
  
  app.post('/quotes', function(req, res) {
    quotes.postquote(req, res);
})
}
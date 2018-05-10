const mongoose = require('mongoose');
var Quote = require('../models/quote')

module.exports.index = function(req, res){
    res.render('index');
}

module.exports.quote = function(req, res){
    Quote.find({}, function(err, quotes) {
        if (err) {
          console.log("We have an error!", err);
          for(var key in err.errors){
              req.flash('errors', err.errors[key].message);
          }
          res.redirect('/');
        }
       else {
        res.render('quotes', {quotes: quotes});
       }
      }) 
}

module.exports.postquote = function(req, res){
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
    }

// Mongoose schema
const mongoose = require('mongoose')
var QuoteSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please enter a name"], minlength: [6, "min length 6 characters"]},
    quote: { type: String, required: [true, "Please enter a quote"], minlength: [10," min length 10 characters"]}
},
{timestamp:true});

module.exports = mongoose.model('Quote', QuoteSchema); 
var Quote = mongoose.model('Quote')
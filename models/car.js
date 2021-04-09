const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    brand: String,
    model: String,
    power: Number,
    seats: Number,
    image: String,
	price: Number,

});


module.exports = mongoose.model('Car', carSchema);
const mongoose = require('mongoose');

const bikeSchema = mongoose.Schema({
    brand: String,
    model: String,
    power: Number,
    image: String,
	price: Number,

});


module.exports = mongoose.model('Bike', bikeSchema);
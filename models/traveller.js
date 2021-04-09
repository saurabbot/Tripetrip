const mongoose = require('mongoose');

const travellerSchema = mongoose.Schema({
    name: String,
    power: Number,
    seats: Number,
    image: String,
	price: Number,

});


module.exports = mongoose.model('Traveller', travellerSchema);
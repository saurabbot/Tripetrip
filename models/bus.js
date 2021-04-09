const mongoose = require('mongoose');

const busSchema = mongoose.Schema({
    brand: String,
    model: String,
    power: Number,
    image: String,
	price: Number,

});


module.exports = mongoose.model('Bus', busSchema);
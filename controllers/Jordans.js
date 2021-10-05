const mongoose = require('mongoose');
const jordansSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    price: Number,
    qty: Number
});

const jordans = mongoose.model('jordans', jordansSchema);

module.exports = products;
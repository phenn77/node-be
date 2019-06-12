const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    price: Number
});

//Export the model
module.exports = mongoose.model('Product', ProductSchema);
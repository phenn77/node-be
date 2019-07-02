const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Product name is required']
    },
    price: {
        type: Number,
        min: 1,
        required: [true, 'Product price is required']
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Company is required'],
        ref: 'Company'
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', ProductSchema);
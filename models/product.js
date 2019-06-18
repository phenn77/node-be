const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', ProductSchema);
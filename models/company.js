const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Company name is required']
    }
}, {
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

CompanySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'company'
});

module.exports = mongoose.model('Company', CompanySchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total Price is required'],
        min: [1000, 'Total Price minimum 1000']
    },
    grandTotal: {
        type: Number
    },
    tax: {
        type: Number
    },
    serviceCharge: {
        type: Number
    },
    transactionDate: {
        type: Date,
        required: [true, 'Date is required']
    },
    details: [
        {
            name: {
                type: String,
                required: [true, 'Detail name is required'],
            },
            price: {
                type: Number,
                required: [true, 'Detail price is required'],
                min: [1, 'Detail price minimum 1000']
            }
        }
    ],
}, {
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

//Validate Detail must not empty
InvoiceSchema.path('details').validate(function (detail) {
    if (!detail) {
        return false;
    } else if (detail.length === 0) {
        return false;
    }

    return true;
}, 'Details must not empty');

module.exports = mongoose.model('Invoice', InvoiceSchema);
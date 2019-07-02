const Invoice = require('../models/invoice');

function findById(id) {
    return new Promise(function (resolve, reject) {
        Invoice.findOne({_id: id}, (err, result) => {
            if (err) {
                reject(err);
            }

            if (result) {
                resolve(result);
            }

            resolve(null);
        });
    });
}

function findAll() {
    return new Promise(function(resolve, reject) {
        Invoice.find({}, (err, result) => {
            if (err) {
                reject(err);
            }

            if (result) {
                resolve(result);
            }

            resolve(null);
        })
    })
}

function create(data) {
    return new Promise(function (resolve, reject) {
        new Invoice({
            name: data.name,
            totalPrice: data.totalPrice,
            transactionDate: data.transactionDate,
            details: data.details
        }).save((err, result) => {
            if (err) {
                reject(err);
            }

            if (result) {
                resolve(result);
            }

            resolve(null);
        })
    })
}

module.exports = {
    findById,
    findAll,
    create
};
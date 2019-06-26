const Product = require('../models/product');

function findById(id) {
    return new Promise(function(resolve, reject) {
        Product.findOne({_id: id})
            .populate('company')
            .exec((err, result) => {
                if(err) {
                    reject(err);
                } if(result) {
                    resolve(result);
                }

                resolve(null);
            })
    });
}

function findAll() {
    return new Promise(function(resolve, reject) {
        Product.find({})
            .populate('company')
            .exec((err, result) => {
                if(err) {
                    reject(err);
                } if(result) {
                    resolve(result);
                }

                resolve(null);
        })
    });
}

function findExist(filter) {
    return new Promise(function(resolve, reject) {
        Product.findOne(filter, (err, result) => {
            if(err) {
                reject(err);
            } if(result) {
                resolve(result);
            }

            resolve(null);
        });
    });
}

function create(data) {
    return new Promise(function(resolve, reject) {
        new Product({
            name: data.name,
            price: data.price,
            company: data.company
        }).save((err, result) => {
            if(err) {
                reject(err);
            } if(result) {
                resolve(result);
            }

            resolve(null);
        });
    });
}

function update(id, data) {
    return new Promise(function(resolve, reject) {
        Product.updateOne({_id: id}, {
            name: data.name,
            price: data.price,
            company: data.company
        }, (err, result) => {
            if(err) {
                reject(err);
            } if(result) {
                resolve(result);
            }

            resolve(null);
        })
    });
}

function remove(id) {
    return new Promise(function(resolve, reject) {
        Product.deleteOne({_id: id}, (err, result) => {
            if(err) {
                reject(err);
            } if(result) {
                resolve(result);
            }

            resolve(null);
        });
    });
}

module.exports = {
    findById,
    findAll,
    findExist,
    create,
    update,
    remove
};
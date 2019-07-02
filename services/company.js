const Company = require('../models/company');

function findById(id) {
    return new Promise(function (resolve, reject) {
        Company.findOne({_id: id})
            .populate('products')
            .exec((err, result) => {
                if (err) {
                    reject(err);
                }
                if (result) {
                    resolve(result);
                }

                resolve(null);
            })
    });
}

function findAll() {
    return new Promise(function (resolve, reject) {
        Company.find({})
            .populate('products')
            .exec((err, result) => {
                if (err) {
                    reject(err);
                }
                if (result) {
                    resolve(result);
                }

                resolve(null);
            })
    });
}

function findExist(filter) {
    return new Promise(function (resolve, reject) {
        Company.findOne(filter, (err, result) => {
            err ? reject(err) : resolve(result);
        })
    });
}

function create(data) {
    return new Promise(function (resolve, reject) {
        new Company({
            name: data.name
        }).save((err, result) => {
            if (err) {
                reject(err);
            }
            if (result) {
                resolve(result);
            }

            resolve(null);
        })
    });
}

function update(id, data) {
    return new Promise(function (resolve, reject) {
        Company.updateOne({_id: id}, {
                name: data.name
            }, {runValidators: true},
            (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result) {
                    resolve(result);
                }

                resolve(null);
            })
    });
}

function remove(id) {
    return new Promise(function (resolve, reject) {
        Company.deleteOne({_id: id}, (err, result) => {
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
    findExist,
    findAll,
    create,
    update,
    remove
}
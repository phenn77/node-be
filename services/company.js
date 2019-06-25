const Company = require('../models/company');

function findById(id) {
    return new Promise(function (resolve, reject) {
        Company.findOne({_id: id})
            .populate('products')
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

function findCompany(id,data) {
    return new Promise(function (resolve, reject)  {
        Company.findOne({ $and: [
            { name:  data.name },
            { _id: { $ne: id } } ]}, (err,result) => {
            if (err) {
                reject(err);
            } if(result) {
                resolve(result);
            }
            resolve(null);
        });
    });
}

function findAll() {
    return new Promise(function (resolve, reject) {
        Company.find({})
            .populate('products')
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

function findExist(data) {
    return new Promise(function (resolve, reject) {
        Company.findOne({
            name: data.name
        }, (err, result) => {
            err ? reject(err) : resolve(result);
        })
    });
}

function create(data) {
    return new Promise(function (resolve, reject) {
        new Company({
            name: data.name
        }).save((err, result) => {
            if(err) {
                reject(err);
            } if(result) {
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
        Company.deleteOne({_id: id}, (err, result) => {
            if(err) {
                reject(err);
            } if(result) {
                resolve(result);
            }

            resolve(null);
        })
    })
}

module.exports = {
    findCompany,
    findById,
    findExist,
    findAll,
    create,
    update,
    remove
}
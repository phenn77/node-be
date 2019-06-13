const Company = require('../models/company');

function findById(id) {
    return new Promise(function (resolve, reject) {
        Company.findById(id, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    });
}

function findAll() {
    return new Promise(function (resolve, reject) {
        Company.find((err, result) => {
            err ? reject(err) : resolve(result);
        });
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

module.exports = {
    findById,
    findExist,
    findAll,
    create,
    update
}
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

function create(data) {
    return new Promise(function (resolve, reject) {
        const company = new Company({
            name: data.name
        });

        Company.save(company, (err, result) => {
            err ? reject(err) : resolve(result);
        })
    });
}

function update(id) {
    return new Promise(function (resolve, reject) {
        Company.findById(id, (err, result) => {

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

module.exports = {
    findById,
    findExist,
    create
};
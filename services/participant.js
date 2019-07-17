const Participant = require('../models/participant');

function findById(id) {
    return new Promise(function (resolve, reject) {
        Participant.findOne({_id: id}, (err, result) => {
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
        Participant.find({}, (err, result) => {
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

function findExist(data) {
    return new Promise(function (resolve, reject) {
        Participant.findOne(
            {
                name: data.name
            }, (err, result) => {
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
        new Participant({
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
        Participant.updateOne({_id: id}, {
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
        Participant.deleteOne({_id: id}, (err, result) => {
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
    findExist,
    create,
    update,
    remove
};
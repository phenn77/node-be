const companyService = require('../services/company');

exports.findById = (req, res) => {
    let data;

    try {
        data = companyService.findById(req.params.id);
    } catch (e) {
        return res.status(500).send({
            message: "Error retrieving Company with ID: " + req.params.id
        });
    }

    if (!data) {
        return res.status(404).send({
            message: "No Company with ID: " + req.params.id
        });
    }

    return res.status(200).send(data);
};

exports.findAll = async (req, res) => {
    let data;

    try {
        data = await companyService.findAll();
    } catch (e) {
        return res.status(500).send({
            message: "Error retrieving Company list"
        });
    }

    if(!data) {
        return res.status(404).send({
            message: "No data"
        })
    }

    res.status(200).send(data);
};

exports.create = async (req, res) => {
    let data;

    try {
        data = await companyService.findExist(req.body);
    } catch (e) {
        return res.status(500).send({
            message: "Error finding existing Company"
        });
    }

    console.log(data);

    if (data) {
        return res.status(404).send({
            message: "Company already exist"
        });
    }

    data = {
      name: req.body.name
    };

    try {
        await companyService.create(data);
    } catch(e) {
        return res.status(500).send({
            message: "Error creating Company"
        });
    }


    return res.status(200).send(data);
};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};
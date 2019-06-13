const companyService = require('../services/company');

exports.findById = async (req, res) => {
    let data;

    try {
        data = await companyService.findById(req.params.id);
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

    return res.status(200).send(data);
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

exports.update = async (req, res) => {
    let result;

    try {
        result = await companyService.update(req.params.id, req.body);
    } catch (e) {
        return res.status(500).send({
            message: "Error update Company"
        });
    }

    if(result) {
        return res.status(500).send({
            message: "Company not found"
        });
    }

    return res.status(200).send(result);
};

exports.delete = async (req, res) => {

};
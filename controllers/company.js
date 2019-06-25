const companyService = require('../services/company');
const message = require('../library/message');

exports.findById = async (req, res) => {
    let data;

    try {
        data = await companyService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error retrieving Company");
    }

    if (!data) {
        return message.notFound(res, "Company not found");
    }

    return message.success(res, data);
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
    } catch (e) {
        return res.status(500).send({
            message: "Error creating Company"
        });
    }

    return res.status(200).send(data);
};

exports.update = async (req, res) => {
    let data;

    try {
        data = await companyService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error finding Company");
    }

    if(!data) {
        return message.notFound(res, "Company not found");
    }

    data = req.body;
    let nameTaken;
    try {
        nameTaken = await companyService.findCompany(req.params.id, data);
    } catch (e) {
        console.log(e);
        return message.error(res, "Error finding company");
    }
    console.log(nameTaken);
    if (nameTaken) {
        return message.error(res, "Name already taken");
    }

    try {
        await companyService.update(req.params.id, data);
    } catch (e) {
        return message.error(res, "Error update Company")
    }

    return message.success(res, data);
};

exports.delete = async (req, res) => {
    let data;

    try {
        data = await companyService.remove(req.params.id);
    } catch (e) {
        return res.status(500).send({
            message: "Error deleting Company"
        });
    }

    if(!data) {
        return res.status(500).send({
            message: "Company not found"
        });
    }

    return res.status(200).send({
        message: "Company deleted"
    });
};
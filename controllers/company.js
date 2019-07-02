const companyService = require('../services/company');
const message = require('../library/message');

exports.findById = async (req, res) => {
    let data;

    try {
        data = await companyService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error finding Company");
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
        return message.error(res, "Error retrieving Company list");
    }

    return message.success(res, data);
};

exports.create = async (req, res) => {
    let data;
    let result;

    const filter = {
        name: req.body.name
    };

    try {
        data = await companyService.findExist(filter);
    } catch (e) {
        return message.error(res, "Error finding Company");
    }

    if (data) {
        return message.notFound(res,"Company already exist");
    }

    data = {
        name: req.body.name
    };

    try {
        result = await companyService.create(data);
    } catch (e) {
        return message.error(res, e.errors.name.message);
    }

    return message.success(res, result);
};

exports.update = async (req, res) => {
    let data;
    let result;

    let nameTaken;
    const filter = {
        $and: [
            {name: req.body.name},
            {_id: {$ne: req.params.id}}
        ]
    };

    /* Find Company */
    try {
        data = await companyService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error finding Company");
    }

    if (!data) {
        return message.notFound(res, "Company not found");
    }
    /* Find Company */

    /* Find Exist Company's name */
    try {
        nameTaken = await companyService.findExist(filter);
    } catch (e) {
        return message.error(res, e.errors.name.message);
    }

    if(nameTaken) {
        return message.notFound(res, "Company already exist");
    }
    /* Find Exist Company's name */

    data = req.body;

    try {
        result = await companyService.update(req.params.id, data);
    } catch (e) {
        return message.error(res, e.errors.name.message)
    }

    return message.success(res, result);
};

exports.delete = async (req, res) => {
    let data;

    try {
        data = await companyService.remove(req.params.id);
    } catch (e) {
        return message.error(res, "Error deleting Company");
    }

    if (!data) {
        return message.notFound(res, "Company not found");
    }

    return res.status(200).send({
        message: "Company deleted"
    });
};
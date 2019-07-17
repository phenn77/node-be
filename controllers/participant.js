const participantService = require('../services/participant');
const message = require('../library/message');

exports.findById = async (req, res) => {
    let data;

    try {
        data = await participantService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error finding participant");
    }

    if (!data) {
        return message.notFound(res, "Participant not found");
    }

    return message.success(res, data);
};

exports.findAll = async (req, res) => {
    let data;

    try {
        data = await participantService.findAll();
    } catch (e) {
        return message.error(res, "Error retrieving list of participants");
    }

    return message.success(res, data);
};

exports.create = async (req, res) => {
    let data;
    let result;

    try {
        data = await participantService.findExist(req.body);
    } catch (e) {
        return message.error(res, "Error finding existing name");
    }

    if (data) {
        return message.error(res, "Name already used");
    }

    try {
        result = await participantService.create(req.body);
    } catch (e) {
        let key = Object.keys(e.errors)[0]; //to get the validate field
        return message.error(res, e.errors[key].message);
    }

    return message.success(res, result);
};

exports.update = async (req, res) => {
    let data;
    let result;

    try {
        data = await participantService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error finding Participant");
    }

    if (!data) {
        return message.notFound(res, "Participant not found");
    }

    try {
        result = await participantService.update(req.params.id, req.body);
    } catch (e) {
        return message.error(res, "Error updating Participant");
    }

    return message.success(res, result);
};

exports.delete = async (req, res) => {
    let data;

    try {
        data = await participantService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error finding Participant");
    }

    if (!data) {
        return message.notFound(res, "Participant not found");
    }

    try {
        result = await participantService.remove(req.params.id);
    } catch (e) {
        return message.error(res, "Error deleting Participant");
    }

    return res.status(200).send({
        message: "Participant deleted"
    });
};


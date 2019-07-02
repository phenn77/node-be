const invoiceService = require('../services/invoice');
const message = require('../library/message');

exports.findById = async (req, res) => {
    let data;

    try {
        data = await invoiceService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error finding Invoice");
    }

    if (!data) {
        return message.notFound(res, "Invoice not found");
    }

    return message.success(res, data);
};

exports.findAll = async (req, res) => {
    let data;

    try {
        data = await invoiceService.findAll();
    } catch (e) {
        return message.error("Error finding Invoice List");
    }

    return message.success(res, data);
};

exports.create = async (req, res) => {
    let result;

    const data = {
        name: req.body.name,
        totalPrice: req.body.totalPrice,
        transactionDate: req.body.transactionDate,
        details: req.body.details
    };

    try {
        result = await invoiceService.create(data);
    } catch (e) {
        let key = Object.keys(e.errors)[0]; //to get the validate field
        return message.error(res, e.errors[key].message);
    }

    return message.success(res, result);
};
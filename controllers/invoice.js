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
    let sumDetailPrice;

    const data = {
        name: req.body.name,
        totalPrice: req.body.totalPrice,
        grandTotal: req.body.grandTotal,
        tax: req.body.tax,
        serviceCharge: req.body.serviceCharge,
        transactionDate: req.body.transactionDate,
        details: req.body.details
    };

    for(let value of data.details) {
        console.log(value.price);
        sumDetailPrice +=  value.price;
    }

    console.log(sumDetailPrice);
    // try {
    //     result = await invoiceService.create(data);
    // } catch (e) {
    //     let key = Object.keys(e.errors)[0]; //to get the validate field
    //     return message.error(res, e.errors[key].message);
    // }

    return message.success(res, result);
};

exports.update = async (req, res) => {
    let data;
    let result;

    try {
        data = await invoiceService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error finding Invoice");
    }

    if(!data) {
        return message.notFound(res, "Invoice not found");
    }

    data = req.body;

    try {
        result = await invoiceService.update(req.params.id, data);
    } catch (e) {
        let key = Object.keys(e.errors)[0]; //to get the validate field
        return message.error(res, e.errors[key].message);
    }

    return message.success(res, result);
};

exports.delete = async (req, res) => {
    let data;

    try {
        data = await invoiceService.findById(req.params.id);
    } catch (e) {
        return message.error(res,"Error finding Invoice");
    }

    if(!data) {
        return message.notFound(res, "Invoice not found");
    }

    try {
        await invoiceService.remove(req.params.id);
    } catch (e) {
        return message.error(res, "Error deleting Invoice");
    }

    return res.status(200).send({
        message: "Invoice deleted"
    })
};

exports.split = async (req, res) => {
    let data;
};
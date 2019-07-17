const invoiceService = require('../services/invoice');
const participantService = require('../services/participant');
const message = require('../library/message');
const math = require('../library/math');

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
    let invoice;

    const data = {
        name: req.body.name,
        totalPrice: req.body.totalPrice,
        grandTotal: req.body.grandTotal,
        tax: req.body.tax,
        serviceCharge: req.body.serviceCharge,
        transactionDate: req.body.transactionDate,
        details: req.body.details
    };

    try {
        invoice = await invoiceService.create(data);
    } catch (e) {
        let key = Object.keys(e.errors)[0]; //to get the validate field
        return message.error(res, e.errors[key].message);
    }

    return message.success(res, invoice);
};

exports.update = async (req, res) => {
    let data;
    let result;

    try {
        data = await invoiceService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error finding Invoice");
    }

    if (!data) {
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
        return message.error(res, "Error finding Invoice");
    }

    if (!data) {
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
    let container = [];
    let participantList = [];

    let participantData = await participantService.findAll();
    for (let participant of participantData) {
        participantList[participant._id] = participant.name;
    }

    try {
        data = await invoiceService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error finding Invoice");
    }

    if (!data) {
        return message.notFound(res, "Invoice not found");
    }

    /* List of Participant with each Price of Menu */
    for (let value of data.details) {
        for (let participant of value.participants) {
            container.push({
                name: participantList[participant],
                menu: {
                    [value.name]: Math.round(value.price / value.participants.length)
                },
                price: Math.round(value.price / value.participants.length)
            });
        }
    }

    /* Get list of price on each Participant */
    let getEachPrice = container.reduce(function (value, key) {
        value[key.name] = value[key.name] || [];

        value[key.name].push(key.price);

        return value;
    }, Object.create(null));

    /* Get list of menu on each Participant */
    let getEachMenu = container.reduce(function (value, key) {
        value[key.name] = value[key.name] || [];

        value[key.name].push(key.menu);

        return value;
    }, Object.create(null));

    /* Group participant with list of menu and amount */
    let result = container.reduce(function (value, key) {
        const grandTotal = math.arrSum(getEachPrice[key.name]);
        const servCharge = Math.round((grandTotal * data.serviceCharge) / 100);
        const tax = Math.round((grandTotal + servCharge) * (data.tax / 100));

        value[key.name] = {
            menu: Object.assign({}, ...getEachMenu[key.name]),
            grandTotal: grandTotal,
            serviceCharge: servCharge,
            tax: tax,
            total: grandTotal + servCharge + tax
        };

        return value;
    }, Object.create(null));

    return message.success(res, result);
};
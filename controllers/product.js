const productService = require('../services/product');
const companyService = require('../services/company');
const message = require('../library/message');

exports.findById = async (req, res) => {
    let data;

    try {
        data = await productService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error retrieving Product with ID: " + req.params.id);
    }

    if (!data) {
        return message.notFound(res, "Product not found");
    }

    return message.success(res, data);
};

exports.findAll = async (req, res) => {
    let data;

    try {
        data = await productService.findAll();
    } catch (e) {
        return message.error(res, "Error retrieving Product list");
    }

    return message.success(res, data);
};

exports.create = async (req, res) => {
    let data;
    let companyData;

    try {
        data = await productService.findExist(req.body);
    } catch (e) {
        return message.error(res, "Error finding Product")
    }

    if (data) {
        return message.error(res, "Product is already exist")
    }

    try {
        companyData = await companyService.findById(req.body.company);
    } catch (e) {
        return message.error(res, "Error finding Company");
    }

    if (!companyData) {
        return message.notFound(res, "Company not found");
    }

    data = {
        name: req.body.name,
        price: req.body.price,
        company: req.body.company
    };

    try {
        await productService.create(data);
    } catch (e) {
        return message.error(res, "Error creating Product");
    }

    return message.success(res, data);
};

exports.update = async (req, res) => {
    let data;

    try {
        data = await productService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error retrieving Product");
    }

    if (!data) {
        return message.notFound(res, "Product not found");
    }

    data = req.body;

    try {
        await productService.update(req.params.id, data);
    } catch (e) {
        return message.error("Error updating Product");
    }

    return message.success(res, data);
};

exports.delete = async (req, res) => {
    let data;

    try {
        data = await productService.findById(req.params.id);
    }catch (e) {
        return message.error(res, "Error finding Product");
    }

    if(!data) {
        return message.notFound(res, "Product not found");
    }

    try {
        await productService.remove(req.params.id);
    } catch (e) {
        return message.error("Error deleting Product");
    }

    return res.status(200).send({
        message: 'Product deleted'
    })
};
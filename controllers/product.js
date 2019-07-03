const productService = require('../services/product');
const companyService = require('../services/company');
const message = require('../library/message');

exports.findById = async (req, res) => {
    let data;

    try {
        data = await productService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error finding Product");
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
    let result;

    const filter = {
        name: req.body.name
    };

    /* Find Exist */
    try {
        data = await productService.findExist(filter);
    } catch (e) {
        return message.error(res, "Error finding Product")
    }

    if (data) {
        return message.error(res, "Product is already exist")
    }
    /* Find Exist */

    /* Find Company to connect with */
    try {
        companyData = await companyService.findById(req.body.company);
    } catch (e) {
        return message.error(res, "Error finding Company");
    }

    if (!companyData) {
        return message.notFound(res, "Company not found");
    }
    /* Find Company to connect with */

    data = {
        name: req.body.name,
        price: req.body.price,
        company: req.body.company
    };

    try {
        result = await productService.create(data);
    } catch (e) {
        let key = Object.keys(e.errors)[0]; //to get the validate field
        return message.error(res, e.errors[key].message);
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

    /* Find Product */
    try {
        data = await productService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error finding Product");
    }

    if (!data) {
        return message.notFound(res, "Product not found");
    }
    /* Find Product */

    /* Find Exist Product's name */
    try {
        nameTaken = await productService.findExist(filter);
    } catch {
        return message.error(res, "Error finding Product");
    }

    if(nameTaken) {
        return message.notFound(res, "Product already exist");
    }
    /* Find Exist Product's name */

    data = req.body;

    try {
        result = await productService.update(req.params.id, data);
    } catch (e) {
        let key = Object.keys(e.errors)[0]; //to get the validate field
        return message.error(res, e.errors[key].message);
    }

    return message.success(res, result);
};

exports.delete = async (req, res) => {
    let data;

    try {
        data = await productService.findById(req.params.id);
    } catch (e) {
        return message.error(res, "Error finding Product");
    }

    if (!data) {
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
const Product = require('../models/product');

/* Add */
exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err, next) {
        if (err) return next(err);

        res.send('Product Created successfully')
    })
};
/* Add */

/* Read */
exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product, next) {
        if (err) return next(err);

        res.send(product);
    })
};
/* Read */

/* Update */
exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, next) {
        if (err) return next(err);

        res.send('Product Updated successfully!');
    });
};
/* Update */

/* Delete */
exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err, next) {
        if (err) return next(err);

        res.send('Deleted successfully!');
    })
};
/* Delete */
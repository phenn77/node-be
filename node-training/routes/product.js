const express = require('express');
const router = express.Router();

//Require the controllers!!
const product_controller = require('../controllers/product');

//list of routes

//Product CRUD
router.post('/create', product_controller.product_create); //Add
router.get('/:id', product_controller.product_details);//Read
router.put('/:id/update', product_controller.product_update);//Update
router.delete('/:id/delete', product_controller.product_delete);//Delete

module.exports = router;
const express = require('express');
const router = express.Router();

//Require the controllers!!
const controller = require('../controllers/product');

//list of routes

//Product CRUD
router.post('/create', controller.create); //Add
router.get('/:id', controller.findById);//Read
router.get('', controller.findAll);
router.put('/:id/update', controller.update);//Update
router.delete('/:id/delete', controller.delete);//Delete

module.exports = router;
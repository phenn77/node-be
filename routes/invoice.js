const express = require('express');
const router = express.Router();

const controller = require('../controllers/invoice');

router.get('/:id', controller.findById);
router.get('', controller.findAll);

router.post('/create', controller.create);
router.put('/:id/update', controller.update);

router.delete('/:id/delete', controller.delete);

module.exports = router;
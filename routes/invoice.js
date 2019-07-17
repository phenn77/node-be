const express = require('express');
const router = express.Router();

const controller = require('../controllers/invoice');

router.get('/:id', controller.findById);
router.get('', controller.findAll);

router.post('/create', controller.create);
router.put('/:id/update', controller.update);

router.get('/:id/delete', controller.delete);

router.get('/:id/split', controller.split);

module.exports = router;
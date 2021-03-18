const express = require('express');
const router = express.Router();
const controller = require('../controllers/course');

router.get('/', controller.info);

router.get('/:id', controller.specificInfo);

module.exports = router;

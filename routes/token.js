const express = require('express');
const router = express.Router();
const controller = require('../controllers/token');

router.get('/access', controller.accessToken);

router.get('/refresh', controller.refreshToken);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('./search.controller');

router.get('/', controller.searchAll);


module.exports = router;
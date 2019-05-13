const express = require('express');
const router = express.Router();
const controller = require('./search.controller');

router.get('/', controller.searchAll);
router.post('/option', controller.searchRooms)
router.post('/', controller.insertRoom);

module.exports = router;
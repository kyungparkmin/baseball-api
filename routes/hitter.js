const express = require('express');
const router = express.Router();

const controller = require('../controllers/hitter.controller');

router.get('/:name', controller.getHitterData)

module.exports = router;

const express = require('express');
const router = express.Router();

const controller = require('../controllers/pitcher.controller');

router.get('/:name', controller.getPitcherData);
router.get('/total/:name', controller.getPitcherTotalData);

module.exports = router;

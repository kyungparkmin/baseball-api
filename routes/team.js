const express = require('express');
const router = express.Router();

const controller = require('../controllers/team.controller');

router.get('/rank', controller.getTeamRankingData);

module.exports = router;
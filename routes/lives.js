var express = require('express');
var router = express.Router();
const lives = require('../json/lives.json');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('live', lives);
});

module.exports = router;

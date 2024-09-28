var express = require('express');
var router = express.Router();
const info = require('../json/info.json');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', info);
});

module.exports = router;

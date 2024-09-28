let express = require('express');
let router = express.Router();
const pan = require('../json/mpan.json');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('pan', pan);
});

module.exports = router;

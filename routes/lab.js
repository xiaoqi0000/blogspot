let express = require('express');
let router = express.Router();
const lab = require('../json/lab.json');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('lab', lab);
});

module.exports = router;

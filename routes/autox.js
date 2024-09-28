let express = require('express');
let router = express.Router();
const autox = require('../json/autox.json');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('autox', autox);
});

module.exports = router;

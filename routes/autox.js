let express = require('express');
let router = express.Router();
const { autox } = require('../mongo/schema');



/* GET users listing. */
router.get('/', function (req, res, next) {
    autox.find()
        .then((users) => {
            // console.log('查询结果:', users[0]);
            res.render('autox', users[0]);
        })
        .catch((err) => console.error('查询出错:', err));

});

module.exports = router;

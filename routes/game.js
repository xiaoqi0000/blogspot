let express = require('express');
let router = express.Router();
const { game } = require('../mongo/schema');



/* GET users listing. */
router.get('/', function (req, res, next) {
    game.find()
        .then((users) => {
            console.log('查询结果:', users[0]);
            res.render('game', users[0]);
        })
        .catch((err) => console.error('查询出错:', err));
});


module.exports = router;

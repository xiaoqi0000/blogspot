let express = require('express');
let router = express.Router();
const game = require('../json/game.json');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('game', game);
});


module.exports = router;

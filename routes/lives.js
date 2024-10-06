var express = require('express');
var router = express.Router();
const lives = require('../json/lives.json');
let db = require('../lowdb/db.js');
/* GET users listing. */
router.get('/', function (req, res, next) {
    //获取数据
let num = db.get('livesNum').value();
// console.log(num);

//更改数据
db.set('livesNum', num + 1).write();

  res.render('live', lives);
});

module.exports = router;

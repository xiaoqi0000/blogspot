var express = require('express');
var router = express.Router();
let db = require('../lowdb/db.js');
/* GET users listing. */
router.get('/', function (req, res, next) {
    //获取数据
let num = db.get('timetableNum').value();
// console.log(num);

//更改数据
db.set('timetableNum', num + 1).write();

  res.render('timetable');
});

module.exports = router;

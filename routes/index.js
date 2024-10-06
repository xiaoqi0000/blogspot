var express = require('express');
var router = express.Router();
const info = require('../json/info.json');

//lowdb
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('json/user.json');
const db = lowdb(adapter);


/* GET home page. */
router.get('/', function (req, res, next) {
  //获取数据
let num = db.get('indexNum').value();
// console.log(num);

//更改数据
db.set('indexNum', num + 1).write();


  res.render('index', info);
});

module.exports = router;

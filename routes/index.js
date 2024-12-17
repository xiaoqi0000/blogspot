var express = require('express');
var router = express.Router();
const { info, user } = require('../mongo/schema');

/* GET home page. */
router.get('/', function (req, res, next) {
  user.find()
    .then((list) => {
      let newItem = list[0]
      newItem.indexNum += 1
      //修改数据
      user.updateOne({
        _id: newItem._id
      }, {
        indexNum: newItem.indexNum
      }).then((res) => {
        console.log('修改成功');
      }).catch((err) => {
        console.log('修改失败');
      });

    })
    .catch((err) => console.error('查询出错:', err));


  info.find()
    .then((users) => {
      // console.log('查询结果:', users[0]);
      res.render('index', users[0]);
    })
    .catch((err) => console.error('查询出错:', err));

});

module.exports = router;

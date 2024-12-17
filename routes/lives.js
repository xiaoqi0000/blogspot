var express = require('express');
var router = express.Router();
const { lives, user } = require('../mongo/schema');
/* GET users listing. */
router.get('/', function (req, res, next) {

  //更改数据
  user.find()
    .then((list) => {
      let newItem = list[0]
      newItem.livesNum += 1
      //修改数据
      user.updateOne({
        _id: newItem._id
      }, {
        livesNum: newItem.livesNum
      }).then((res) => {
        console.log('修改成功');
      }).catch((err) => {
        console.log('修改失败');
      });

    })
    .catch((err) => console.error('查询出错:', err));


  lives.find()
    .then((users) => {
      // console.log('查询结果:', users[0]);
      res.render('live', users[0]);
    })
    .catch((err) => console.error('查询出错:', err));



});

module.exports = router;

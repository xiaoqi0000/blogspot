var express = require("express");
var router = express.Router();
var cors = require("cors");
const { info, user } = require("../mongo/schema");

/* GET home page. */
router.get("/", function (req, res, next) {
  user.find()
    .then((list) => {
      let newItem = list[0];
      newItem.indexNum += 1;
      //修改数据
      user.updateOne({
        _id: newItem._id,
      }, {
        indexNum: newItem.indexNum,
      }).then((res) => {
        console.log("修改成功");
      }).catch((err) => {
        console.log("修改失败");
      });
    })
    .catch((err) => console.error("查询出错:", err));

  info.find()
    .then((users) => {
      // console.log('查询结果:', users[0]);
      res.render("index", users[0]);
    })
    .catch((err) => console.error("查询出错:", err));
});

// 工科大课程表信息
router.use(cors({
  origin: "http://localhost:8000", // 指定允许的前端域名
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  maxAge: 86400, // 预检请求缓存时间（秒）
}));

router.post("/gkd/timetable", async function (req, res, next) {
  console.log("接受到数据");
  
  try {
    // 使用await简化Promise链
    const list = await user.find().exec();
    
    if (!list || list.length === 0) {
      return res.status(404).send("未找到用户数据");
    }
    
    const newItem = list[0];
    newItem.GKDTimeTableNum += 1;
    
    // 更新数据并等待结果
    const updateResult = await user.updateOne(
      { _id: newItem._id },
      { GKDTimeTableNum: newItem.GKDTimeTableNum }
    ).exec();
    
    console.log("工科大课程表修改成功");
    res.send("你是本次更新后第 " + newItem.GKDTimeTableNum + " 个访问者");
    
  } catch (err) {
    console.error("工科大课程表修改失败:", err);
    res.status(500).send("服务器内部错误");
  }
});

module.exports = router;

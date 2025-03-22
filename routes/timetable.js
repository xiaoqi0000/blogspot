let express = require('express');
let router = express.Router();
const { timetable, user, Course } = require('../mongo/schema');



/* GET users listing. */
router.get('/', function (req, res, next) {
    //mongodb修改数据
    user.find()
        .then((list) => {
            let newItem = list[0]
            newItem.timetableNum += 1
            //修改数据
            user.updateOne({
                _id: newItem._id
            }, {
                timetableNum: newItem.timetableNum
            }).then((res) => {
                console.log('修改成功');
            }).catch((err) => {
                console.log('修改失败');
            });
        })
        .catch((err) => console.error('查询出错:', err));

    //mongodb查询数据
    // timetable.find()
    //     .then((users) => {
    //         let mongoData = users[0]
    //         let data = mongoData.cla;
    //         res.render('timetable', { cla: String(JSON.stringify({ cla: data })) });

    //     })
    //     .catch((err) => console.error('查询出错:', err));

    Course.find()
        .then((data) => {
            console.info(data);
            res.render('timetable', { cla: String(JSON.stringify({ cla: data })) });

        })
        .catch((err) => console.error('查询出错:', err));



});


module.exports = router;

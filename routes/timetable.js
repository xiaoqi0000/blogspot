let express = require('express');
let router = express.Router();
const { timetable, user } = require('../mongo/schema');



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
    timetable.find()
        .then((users) => {
            let mongoData = users[0]
            let data = mongoData.cla;
            res.render('timetable', { cla: String(JSON.stringify({ cla: data })) });

        })
        .catch((err) => console.error('查询出错:', err));



});
router.get('/admin', function (req, res, next) {
    res.redirect('/timetable/admin.html');
});
router.post('/', function (req, res, next) {
    // console.log(req.body);
    //验证密码
    if (req.body.code == 'sxq') {
        let val = req.body;
        timetable.find()
            .then((users) => {
                let mongoData = users[0]
                let cla = mongoData.cla;
                let vv = cla.find(cla => {
                    return cla.className == val.className
                });
                val.classID = vv.classID;
                val.classTeacher = vv.classTeacher;
                if (val.type == 'add') {
                    //增加记录
                    let data = {
                        "className": `${val.className}`,
                        "classID": `${val.classID}`,
                        "classDay": `${val.day}`,
                        "classRoom": `文华-${val.classBuliding}号${val.classType}-${val.classRoom}`,
                        "classTeacher": val.classTeacher,
                        "classWeek": [
                            `${val.weeks}`
                        ],
                        "classTime": `${val.time}`
                    }
                    //mongodb添加数据
                    timetable.find()
                        .then((list) => {
                            let newData = list[0]
                            newData.cla.push(data)
                            //修改数据
                            timetable.updateOne({
                                _id: newData._id
                            }, newData
                            ).then((res) => {
                                console.log('添加课程成功');
                            }).catch((err) => {
                                console.log('添加课程失败');
                            });

                        })
                        .catch((err) => console.error('查询出错1:', err));

                } else if (val.type == 'remove') {
                    //删除记录
                    //mongodb查找
                    timetable.find()
                        .then((users) => {
                            let mongoData = users[0]
                            let cla = mongoData.cla;
                            let log = cla.find(cla => {
                                //依据 第几周 星期几 第几节 课程名称 来删除记录
                                return cla.classWeek.includes(`${val.weeks}`) && cla.classTime == `${val.time}` && cla.classDay == `${val.day}` && cla.className == `${val.className}`
                            });
                            console.log("更改前的数据；", log);

                            if (log == undefined) {
                                res.redirect('/timetable/error.html')
                                return;
                            }
                            let arr = log.classWeek
                            // console.log(arr);

                            arr.splice(arr.indexOf(`${val.weeks}`), 1);
                            // console.log(arr);

                            if (arr.length == 0) {
                                console.log("删除数据：", log);

                                //mongodb删除数据
                                timetable.find()
                                    .then((list) => {
                                        let newData = list[0]
                                        let newCla = newData.cla;
                                        newCla.splice(newCla.indexOf(log), 1)
                                        //修改数据
                                        timetable.updateOne({
                                            _id: newData._id
                                        }, {
                                            cla: newCla
                                        }).then((res) => {
                                            console.log('删除课程成功');
                                        }).catch((err) => {
                                            console.log('删除课程失败');
                                        });

                                    })
                                    .catch((err) => console.error('查询出错2:', err));
                            } else {
                                //mongodb修改数据
                                timetable.find()
                                    .then((list) => {
                                        let newData = list[0]

                                        let newCla = newData.cla;
                                        let newLog = newCla.find(cla => {
                                            return cla.className == `${val.className}`
                                        });
                                        newCla.splice(newCla.indexOf(newLog), 1)
                                        newLog.classWeek = arr;
                                        newCla.push(newLog)

                                        //修改数据
                                        timetable.updateOne({
                                            _id: newData._id
                                        }, {
                                            cla: newCla
                                        }).then((res) => {
                                            console.log('修改课程成功');
                                        }).catch((err) => {
                                            console.log('修改课程失败');
                                        });

                                    })
                                    .catch((err) => console.error('查询出错3:', err));
                                // console.log("更改后的数据：", dbData);
                            }

                        })
                        .catch((err) => console.error('查询出错4:', err));
                }
                res.redirect('/timetable/succeed.html');
            })
            .catch((err) => console.error('查询出错5:', err));
    } else {
        res.redirect('/timetable/error.html');
    }
});

module.exports = router;

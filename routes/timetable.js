let express = require('express');
let router = express.Router();
const db = require('../lowdb/timetable');

const timetable = require('../json/timetable.json');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('timetable', { cla: String(JSON.stringify(timetable)) });
});
router.get('/admin', function (req, res, next) {
    res.redirect('/timetable/admin.html');
});
router.post('/', function (req, res, next) {
    // console.log(req.body);
    //验证密码
    if (req.body.code == 'sxq') {
        let val = req.body;
        const vv = db.get('cla').find({ "className": val.className }).value();
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
            db.get('cla').push(data).write();
            console.log("添加数据：", data);
        } else if (val.type == 'remove') {
            //删除记录

            let log = db.get('cla').find(cla => {
                //依据 第几周 星期几 第几节 课程名称 来删除记录
                return cla.classWeek.includes(`${val.weeks}`) && cla.classTime == `${val.time}` && cla.classDay == `${val.day}` && cla.className == `${val.className}`
            }).value();
            // console.log("更改前的数据；", log);

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

                db.get('cla').remove(log).write();
            } else {
                const dbData = db.get('cla').find(cla => {
                    return cla.classWeek.includes(`${val.weeks}`)
                }).assign({ classWeek: arr }).write();

                console.log("更改后的数据：", dbData);
            }
        }
        res.redirect('/timetable/succeed.html');
    } else {
        res.redirect('/timetable/error.html');
    }
});

module.exports = router;

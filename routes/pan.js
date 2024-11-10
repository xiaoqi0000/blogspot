let express = require('express');
let router = express.Router();
const pan = require('../json/mpan.json');
const axios = require('axios');
const { refreshData, db } = require('../lowdb/pan.js');


/* GET users listing. */
router.get('/', function (req, res, next) {
    let data = db.get('content').value()
    res.render('pan', { content: data });
});
router.post('/', async function (req, res, next) {
    let { fileName, fileType, fileUrl, fileUser } = req.body;
    // console.log("req.body:", req.body);
    //身份验证
    if (fileUser !== 'sxq') {
        return res.status(401).send('身份验证失败，文件已删除。');
    }
    //操作文件
    if (fileType === 'add') {
        //添加文件
        let data = {
            name: fileName,
            path: 'http://www.yydsa.top:6400/parser?url=' + fileUrl,
            jsonPath: 'http://www.yydsa.top:6400/json/parser?url=' + fileUrl
        }
        db.get('content').unshift(data).write()
        console.log('添加文件成功！:', fileName)
        //URL是否合法
        refreshData(data)
    } else if (fileType === 'sub') {
        //删除文件
        db.get('content').remove({ name: fileName }).write()
        console.log('删除文件成功！:', fileName)
    }

    res.send('操作成功！');

});

module.exports = router;

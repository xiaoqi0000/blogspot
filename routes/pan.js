let express = require('express');
let router = express.Router();
const { mpan } = require('../mongo/schema');


/* GET users listing. */
router.get('/', function (req, res, next) {
    //mongodb获取数据
    mpan.find()
        .then((users) => {
            let data = users[0].content
            // console.log('查询结果:', users[0]);
            res.render('pan', { content: data });
        })
        .catch((err) => console.error('查询出错:', err));

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
        // db.get('content').unshift(data).write()

        //mongodb添加数据
        mpan.find()
            .then((list) => {
                let newItem = list[0]
                newItem.content.unshift(data)

                //修改数据
                mpan.updateOne({
                    _id: newItem._id
                }, newItem
                ).then((res) => {
                    console.log('修改成功');
                }).catch((err) => {
                    console.log('修改失败');
                });

            })
            .catch((err) => console.error('查询出错:', err));




        console.log('添加文件成功！:', fileName)
        //URL是否合法
        //以前有lowdb数据更新

    } else if (fileType === 'sub') {
        //删除文件
        // db.get('content').remove({ name: fileName }).write()
        //mongodb删除数据
        mpan.find()
            .then((list) => {
                let newItem = list[0]
                newItem.content = newItem.content.filter(item => item.name !== fileName)
                //修改数据
                mpan.updateOne({
                    _id: newItem._id
                }, newItem
                ).then((res) => {
                    console.log('修改成功');
                }).catch((err) => {
                    console.log('修改失败');
                });

            })
            .catch((err) => console.error('查询出错:', err));

        console.log('删除文件成功！:', fileName)
    }

    res.send('操作成功！');

});

module.exports = router;

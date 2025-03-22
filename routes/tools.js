let express = require('express');
let router = express.Router();
let multer = require('multer');
let { UploadFile } = require('../mongo/uploadModel');
const moment = require('moment');
let fs = require('fs');

/* GET users listing. */
router.get('/markdown', function (req, res, next) {
    res.redirect('/tools/markdown.html');
});

router.get('/upload', function (req, res, next) {
    res.render('upload');
});




//上传下载API
router.get('/downloadFile', function (req, res, next) {
    let newData = {
        "name": "全部文件",
        "allDate": []
    }

    UploadFile.find().then((result) => {
        // 遍历数据，以日期排序
        result.sort((a, b) => {
            return b.timestamp - a.timestamp;
        });


        const data = { allDate: [] };
        const processedDates = new Set();

        for (let i = 0; i < result.length; i++) {
            const timestamp = result[i].timestamp;
            const originalDate = new Date(parseInt(timestamp));
            const formattedDate = moment(originalDate).format('MM月DD日');

            // 如果当前日期已经处理过，跳过本次循环
            if (processedDates.has(formattedDate)) {
                continue;
            }

            const item = {
                date: formattedDate,
                allFileName: []
            };

            // 遍历剩余数据，收集同一天的文件名
            for (let j = i; j < result.length; j++) {
                const otherTimestamp = result[j].timestamp;
                const otherOriginalDate = new Date(parseInt(otherTimestamp));
                const otherFormattedDate = moment(otherOriginalDate).format('MM月DD日');
                if (formattedDate === otherFormattedDate) {
                    item.allFileName.push({ title: result[j].fileName, filename: result[j].timestamp + '.' + result[j].fileName.split('.').pop() });
                }
            }

            data.allDate.push(item);
            processedDates.add(formattedDate);
        }

        newData.allDate = data.allDate;
        // console.log(newData);
        res.json({
            code: 200,
            msg: "下载成功",
            data: newData
        })
    }).catch((err) => {
        console.log(err);
        res.json({
            code: 500,
            msg: "下载失败",
            data: {}
        })
    });

});


//上传文件
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        const iconv = require('iconv-lite');
        const originalname = iconv.decode(file.originalname, 'UTF-8');
        let suffix = originalname.split('.').pop();
        file.originalname = originalname;
        console.log(originalname);

        cb(null, Date.now() + '.' + suffix)
    }
})
let upload = multer({ storage: storage });
router.post('/uploadFile', upload.single('file'), function (req, res, next) {
    let file = req.file;
    let fileItem = {
        timestamp: '',
        fileName: file.originalname
    }
    fileItem.timestamp = file.filename.split('.')[0];
    console.info(fileItem);
    const uploadFile = new UploadFile(fileItem);
    uploadFile.save().then(() => {
        console.info(new Date().toTimeString(), fileItem.fileName, '保存成功');
    }).catch((err) => {
        console.log(err);
    });
    // console.log('上传成功');
    res.json(
        {
            code: 200,
            msg: "上传成功",
            data: {}
        }
    )
});

//定时删除文件
setInterval(deleteFile, 24 * 60 * 60 * 1000);

function deleteFile() {
    //超过31天删除文件
    const now = new Date();
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    UploadFile.deleteMany({ timestamp: { $lt: oneMonthAgo.getTime() } }).then(() => {
        console.info(new Date().toTimeString(), '删除成功');
    }).catch((err) => {
        console.log(err);
    });
    //检查文件夹下是否存在数据库中没有的文件，有则删除
    fs.readdir(__dirname + '/../public/uploads/', (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        //排除指定文件夹
        files = files.filter((file) => {
            if (file === 'icon') {//图标文件
                return false;
            }
            if (file === 'assets') {//静态文件
                return false;
            }
            if (file === 'favicon.png') {//页面图标
                return false;
            }

            return true;
        });
        files.forEach((file) => {
            console.log(file);
            // 检查文件是否存在于数据库中
            const timestamp = file.split('.')[0];
            UploadFile.findOne({ timestamp: timestamp }).then((result) => {
                if (!result) {
                    // 如果文件不存在于数据库中，则删除该文件
                    fs.unlink(`./public/uploads/${file}`, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.info(new Date().toTimeString(), file, '删除成功');
                    });
                }
            }).catch((err) => {
                console.log(err);
            });

        });

    });

}


// 模拟数据
let data = "hello world";

router.get('/mddata', function (req, res, next) {
    res.json({
        code: 200,
        data: data
    })
});
router.post('/mddata', function (req, res, next) {
    data = req.body.data;
    res.json({
        code: 200,
        data: data
    })
});

module.exports = router;

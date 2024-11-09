let express = require('express');
let router = express.Router();
const pan = require('../json/mpan.json');
const refreshData = require('../lowdb/pan.js');

// 上传文件
const iconv = require('iconv-lite');
//身份验证
const authenticate = (req, res, next) => {
    const identity = req.query.identity;
    console.log(identity);
    if (identity !== 'sxq') {
        return res.status(401).send('身份验证失败，文件已删除。');
    }
    next();
};
const multer = require('multer');
// 设置存储引擎
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/pan/resource/');
    },
    filename: function (req, file, cb) {
        let originalFileName = file.originalname;
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const datePrefix = `${year}${month}${day}`;
        // 将文件名从可能的乱码编码转换为 UTF-8
        let decodedFileName = iconv.decode(Buffer.from(originalFileName, 'binary'), 'utf8');
        cb(null, `${datePrefix}_${decodedFileName}`);
    }
});
const upload = multer({ storage: storage });


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('pan', pan);
});
router.post('/upload', authenticate, upload.single('file'), function (req, res, next) {
    res.send('文件上传成功！');
    //响应成功后，更改json数据
    setTimeout(() => {
        refreshData();
    }, 1);
});

module.exports = router;

//lowdb
const fs = require('fs');
const folderPath = 'public/pan/resource';

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('json/mpan.json')
const db = low(adapter)

//保持数据的一致性

function refreshData(params) {

    fs.readdir(__dirname + '/../public/pan/resource/', (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        // 遍历文件数组
        let fileList = files;

        // 清空mpan.json数据
        db.get('content').remove().write()

        fileList.forEach(item => {
            //更新mpan.json数据

            db.get('content').unshift({
                name: item,
                path: '../img/' + item
            }).write()

        });

    });
}

module.exports = refreshData;
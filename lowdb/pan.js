//lowdb
const { log } = require('console');
const fs = require('fs');
const folderPath = 'public/pan/resource';
const axios = require('axios');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('json/mpan.json')
const db = low(adapter)

//保持数据的一致性

async function refreshData(data) {
    // 检查是否是123网盘
    if (data.path.includes('https://www.123684.com')) {
        console.log('yydsa.top文件已添加:', data.name)

    } else {
        db.get('content').remove({ name: data.name }).write();
        console.log('URL不合法已删除文件!', data.name);
    }
    // 检查URL是否合法
    try {
        const res = await axios.get(data.jsonPath);
        // console.log('res.data:', res.data);
        if (res.data.success === false) {
            db.get('content').remove({ name: data.name }).write();
            console.log('URL不合法已删除文件!', data.name);
        } else {
            console.log('URL合法文件已添加:', data.name);
        }
        return;
    } catch (error) {
        console.error(error);
    }

}
module.exports = { refreshData, db };
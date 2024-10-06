//lowdb
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('json/user.json');
const db = lowdb(adapter);


module.exports = db;
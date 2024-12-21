const mongoose = require('mongoose');

const uploadFileSchema = new mongoose.Schema({
  date: String,
  allFileName: [{ title: String }]
});

const UploadFile = mongoose.model('UploadFile', uploadFileSchema);

module.exports = UploadFile;
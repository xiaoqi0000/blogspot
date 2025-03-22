const mongoose = require('mongoose');

const uploadFileSchema = new mongoose.Schema({
  timestamp: String,
  fileName: String
});

const UploadFile = mongoose.model('UploadFile', uploadFileSchema);

module.exports = { UploadFile };
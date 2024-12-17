const mongoose = require('mongoose');

const fs = require('fs');

mongoose.connect('mongodb://127.0.0.1:27017/myWWW')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
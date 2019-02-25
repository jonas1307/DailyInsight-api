const mongoose = require('mongoose');
const connection = 'mongodb://localhost/dailyInsight';

module.exports = function () {
    mongoose.connect(connection)
        .then(() => console.log('MongoDB connected.'));
};

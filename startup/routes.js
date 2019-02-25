const express = require('express');
const auth = require('../routes/auth');
const user = require('../routes/users');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/users', user);
};

const express = require('express');
const auth = require('../routes/auth');
const user = require('../routes/users');
const news = require('../routes/news');
const publicnews = require('../routes/publicnews');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/users', user);
    app.use('/api/news', news);
    app.use('/api/publicnews', publicnews);
};

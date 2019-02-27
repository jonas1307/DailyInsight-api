const express = require('express');
const router = express.Router();
const {News} = require('../models/news');

router.get('/', async (req, res) => {
    let news = [];
    if (req.query.q) {
        news = await News.find({'title': new RegExp(req.query.q, "i"), 'isPublished': 'true'});
    } else {
        news = await News.find({'isPublished': 'true'});
    }
    res.send(news);
});

router.get('/:id', async (req, res) => {
    const news = await News.findOne({"_id": req.params.id, 'isPublished': 'true'});
    if (!news) return res.status(404).send('News with the given ID was not found.');
    res.send(news);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { News, validateNews } = require('../models/news');

router.get('/', async (req, res) => {
    const news = await News.find();
    res.send(news);
});

router.get('/:id', async (req, res) => {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).send('News with the given ID was not found.');
    res.send(news);
});

router.post('/', [auth], async (req, res) => {
    const { error } = validateNews(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let item = new News({
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        isPublished: req.body.isPublished,
        isHighlight: req.body.isHighlight,
        createdAt: Date.now(),
        publishedAt: (req.body.isPublished ? Date.now() : '')
    });

    item = await item.save();
    return res.send(item);
});

router.put('/:id', [auth], async (req, res) => {
    const { error } = validateNews(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let item = await News.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        isPublished: req.body.isPublished,
        isHighlight: req.body.isHighlight,
        updatedAt: Date.now(),
        publishedAt: (req.body.isPublished ? Date.now() : '')
    }, { new: true });

    if (!item) return res.status(404).send('News with the given ID was not found.');
    res.send(item);
});

router.delete('/:id', [auth], async (req, res) => {
    const item = await News.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).send('News with the given ID was not found.');
    res.send(item);
});

module.exports = router;

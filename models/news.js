const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200
    },
    author: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 150
    },
    text: {
        type: String,
        required: true,
        minlength: 10
    },
    isPublished: {
        type: Boolean,
        required: true
    },
    isHighlight: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    },
    publishedAt: {
        type: Date
    }
});

const News = mongoose.model('news', schema);

function validateNews(news) {
    const schema = {
        title: Joi.string().min(5).max(200).required(),
        author: Joi.string().min(2).max(150).required(),
        text: Joi.string().min(10).required(),
        isPublished: Joi.boolean().required(),
        isHighlight: Joi.boolean().required()
    };
    return Joi.validate(news, schema);
};

module.exports.News = News;
module.exports.validateNews = validateNews;

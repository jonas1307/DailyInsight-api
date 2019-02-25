const mongoose = require('mongoose');
const Complexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        maxlength: 50
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

schema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, role: this.role }, config.get('jwtPrivateKey'));
};

const User = mongoose.model('users', schema);

function validateUser(user) {
    const options = {
        min: 6,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1
      }
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: new Complexity(options)
    };
    return Joi.validate(user, schema);
};

function validateLogin(request) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(request, schema);
};

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;

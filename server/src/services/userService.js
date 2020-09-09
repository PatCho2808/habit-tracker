const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { api_secret } = require('./../config');

const createUser = async user => {
    try {
        let newUser = new User(user);
        newUser = await newUser.save();
        const newJWT = await jwt.sign({
            'username': newUser.username
        }, api_secret);
        return newJWT;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser
}

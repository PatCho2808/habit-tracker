const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { api_secret } = require('../config');

const createUser = async user => {
    try {
        let newUser = new User(user);
        newUser = await newUser.save();
        return await getToken(newUser); ;
    } catch (error) {
        throw error;
    }
};

const getToken = async user => {
    try {
        const token = await jwt.sign({
            'username': user.username
        }, api_secret);
        return token;
    } catch (error) {
        throw (error);
    }
}


module.exports = {
    createUser, 
    getToken
}

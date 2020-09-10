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

const login = async user => {
    try {
        const userFromDb = await User.findOne({username: user.username});  
        const correctPassword = await userFromDb.comparePassword(user.password);
        if(!correctPassword)
        {
            throw new Error('Incorrect password'); 
        } 
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
    login
}

const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const createUser = async user => {
    try {
        let newUser = new User(user);
        newUser = await newUser.save();
        const newJWT = await jwt.sign({
            'username': newUser.username
        }, 'wethwetjwerhxfgsry');
        return newJWT;
    } catch (error) {
        throw error; 
    }
};

module.exports = {
    createUser
}

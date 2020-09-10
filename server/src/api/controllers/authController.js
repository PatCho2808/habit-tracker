const userService = require('../../services/authService');

const signup = async (req, res, next) => {
    const body = req.body;
    try {
        const jwt = await userService.createUser(body);
        res.json(jwt);
    } catch (error) {
        return next(error);
    }
};

const getToken = async (req, res, next) => {
    const user = req.body;
    try {
        const token = await userService.getToken(user);
        res.json(token);
    } catch (error) {
        next(error); 
    }
}

module.exports = {
    signup, 
    getToken
}
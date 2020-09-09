const userService = require('../../services/userService');

const createUser = async (req, res, next) => {
    const body = req.body;
    try {
        const jwt = await userService.createUser(body);
        res.json(jwt);  
    } catch (error) {
        return next(error); 
    }
};

module.exports = {
    createUser
}
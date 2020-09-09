const mongoService = require('../../services/mongoService');
const jwt = require('jsonwebtoken');

const createUser = async (req, res, next) => {
    const body = req.body;
    try {
        const newUser = await mongoService.createUser(body);
        const newJWT = await jwt.sign({
            'username': newUser.username
        }, 'wethwetjwerhxfgsry'); 
        res.json(newJWT); 

    } catch (error) {
        return next(error); 
    }
};

module.exports = {
    createUser
}
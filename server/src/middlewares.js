const jwt = require('jsonwebtoken'); 
const { response } = require('./app');

const notFound = (req, res, next) => {
    const error = new Error(`Not found = ${req.originalUrl}`); 
    res.status(404); 
    next(error); 
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
    res.status(statusCode); 
    res.json({
        message: err.message, 
        stack: err.stack
    }); 
}; 

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1]; 
    if(!token) {
        res.status(401); 
        next(new Error("Token cannot be empty")) 
    }
    jwt.verify(token, process.env.API_SECRET, (err, user) => {
        if(err) {
            res.status(403); 
            next(err);  
        }
        console.log(user); 
        req.user = user; 
        next(); 
    })
}; 

module.exports = {
    notFound,
    errorHandler, 
    authenticateToken
}
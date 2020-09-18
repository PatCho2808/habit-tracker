const jwt = require('jsonwebtoken'); 

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
        return next(new Error("Token cannot be empty"));  
    }
    jwt.verify(token, process.env.API_SECRET, (err, user) => {
        if(err) {
            res.status(403); 
            next(err);  
        }
        req.user = user; 
        next(); 
    })
}; 

module.exports = {
    notFound,
    errorHandler, 
    authenticateToken
}
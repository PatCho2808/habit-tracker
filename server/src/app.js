const express = require('express');
const app = express();
const middlewares = require('./middlewares'); 

app.use('/', (req, res) => {
    res.end('hello');
}); 

app.use(middlewares.notFound); 
app.use(middlewares.errorHandler); 

module.exports = app; 
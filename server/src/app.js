const express = require('express');
const app = express();
const middlewares = require('./middlewares'); 
const api = require('./routes'); 

app.use('/api', api); 

app.use(middlewares.notFound); 
app.use(middlewares.errorHandler); 

module.exports = app; 
const express = require('express');
const app = express();
const middlewares = require('./middlewares'); 
const api = require('./api/routes'); 

app.use(express.json());

app.use('/api', api); 

app.use(middlewares.notFound); 
app.use(middlewares.errorHandler); 

module.exports = app; 
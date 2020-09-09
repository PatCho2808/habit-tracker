const express = require('express');
const app = express();
const middlewares = require('./middlewares');

const habitRoutes = require('./api/routes/habit');
const userRoutes = require('./api/routes/user'); 

app.use(express.json());

app.use('/api/habit', habitRoutes);
app.use('/api/user', userRoutes); 

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app; 
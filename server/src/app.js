const express = require('express');
const volleyball = require('volleyball');

const app = express();

const middlewares = require('./middlewares');

const db = require('mongoose');
const { db_url } = require('./config');

db.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const habitRoutes = require('./api/routes/habitRoutes');
const authRoutes = require('./api/routes/authRoutes'); 

app.use(express.json());
app.use(volleyball); 

app.use('/api/habit', habitRoutes);
app.use('/api/auth', authRoutes); 

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app; 
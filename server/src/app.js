const express = require('express');
const volleyball = require('volleyball');

const app = express();

const middlewares = require('./middlewares');

const db = require('mongoose');
const { db_url } = require('./config');

db.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connection to db succesfull'))
    .catch(err => console.log(err));


const habitRoutes = require('./api/routes/habitRoutes');
const authRoutes = require('./api/routes/authRoutes');

app.use(express.json());
if(process.env.NODE_ENV !== 'TEST'){
    app.use(volleyball);
}

app.use('/api/habits', habitRoutes);
app.use('/api/auth', authRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app; 
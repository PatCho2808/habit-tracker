const express = require('express');

const app = express();

app.use('/', (req, res) => {
    res.end('hello');
})

module.exports = app; 
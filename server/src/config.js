const config = require('dotenv').config(); 

module.exports = {
    port: config.parsed.PORT,
    db_url: process.env.NODE_ENV === 'TEST' ? config.parsed.TEST_DB_URL : config.parsed.DB_URL, 
    api_secret: config.parsed.API_SECRET
}
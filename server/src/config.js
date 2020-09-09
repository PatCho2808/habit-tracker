const config = require('dotenv').config(); 

module.exports = {
    port: config.parsed.PORT,
    db_url: config.parsed.DB_URL, 
    api_secret: config.parsed.API_SECRET
}
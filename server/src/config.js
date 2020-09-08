const config = require('dotenv').config(); 

module.exports = {
    port: config.parsed.PORT
}
const app = require('./app'); 

const { port } = require('./config');

app.listen(port, console.log(`Listening on http://localhost:${port}`));


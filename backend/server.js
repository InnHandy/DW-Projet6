//code avec le framework express

const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

console.log("server listening on " + app.get('port'));
server.listen(process.env.PORT || 3000);






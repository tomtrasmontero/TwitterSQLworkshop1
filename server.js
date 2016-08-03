var http = require('http');

var server = http.createServer(require('./app'));

server.listen(process.env.PORT, function(){
  console.log('you are listening on port ' + process.env.PORT);
});
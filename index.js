// setting up the node-postgres driver
var pg = require('pg');
var postgresUrl = 'postgres://localhost/___YOUR_DB_NAME_HERE___';
var client = new pg.Client(postgresUrl);

// connecting to the `postgres` server
client.connect();

// make the client available as a Node module
module.exports = client;
const { Client } = require('pg');

const client = new Client({
  // host: 'hostname',
  // port: 'args.port',
  user: 'eatchic',
  password: 'eatchic',
  database: 'eat_chic',
});

const connection = client.connect();

module.exports = connection;


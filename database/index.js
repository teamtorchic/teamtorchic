const { Client } = require('pg');

<<<<<<< HEAD
const client = new Client({
  // host: 'hostname',
  // port: 'args.port',
  user: 'eatchic',
  password: 'eatchic',
  database: 'eat_chic',
});
=======
const client = new Client();
>>>>>>> fixed to airBnB style for server side and database

const connection = client.connect();

module.exports = connection;


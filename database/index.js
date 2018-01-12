const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'eatchic',
  password: 'eatchic',
  database: 'eat_chic',
});

pool.query('select NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

const client = new Client({
  user: 'eatchic',
  password: 'eatchic',
  database: 'eat_chic',
});

module.exports = client;

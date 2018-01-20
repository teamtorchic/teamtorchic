const { Client } = require('pg');

// const pool = new Pool({
//   user: 'eatchic',
//   password: 'eatchic',
//   database: process.env.database,
// });
//
// pool.query('select NOW()', (err, res) => {
  // console.log(err, res);
// });

const client = new Client(process.env.database);

module.exports = { client };

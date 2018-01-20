const { Pool, Client } = require('pg');

// const pool = new Pool({
//   user: 'eatchic',
//   password: 'eatchic',
//   database: 'eat_chic',
// });

// pool.query('select NOW()', (err, res) => {
//   // console.log(err, res);
// });

const client = new Client(process.env.DATABASE_URL);

module.exports = { pool, client };

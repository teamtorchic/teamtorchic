const { Client } = require('pg');
const client = new Client();

const connection = client.connect();

module.exports = connection;
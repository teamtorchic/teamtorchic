const express = require('express');
const db = require('../database');
const path = require('path');
<<<<<<< HEAD

// Middleware
const bodyParser = require('body-parser');

// Router
const router = require('./routes.js');
=======
>>>>>>> fixed to airBnB style for server side and database

// Middleware
const bodyParser = require('body-parser');

// Router
const router = require('./routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

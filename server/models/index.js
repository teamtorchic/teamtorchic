const db = require('../../database');
const Promise = require('bluebird');

db.connect();

module.exports = {
  post: {
    getAll: () => {
      let queryString = 'select * from users';
      return new Promise((resolve, reject) => {
        db.query(queryString, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    },
  },
};

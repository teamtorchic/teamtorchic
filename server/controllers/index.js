const models = require('../models');

module.exports = {
  post: {
    getAll: (req, res) => {
      models.post.getAll()
        .then((results) => {
          res.json(results);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
  },

};

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
  dishlikes: {
    get: (req, res) => {
      const { dishId } = req.params;
      models.dishlikes.get(dishId)
        .then((results) => {
          const data = {
            upvote: 0,
            downvote: 0,
          };
          JSON.parse(JSON.stringify(results.rows)).forEach((post) => {
            if (post.likesdish) {
              data.upvote += 1;
            } else {
              data.downvote += 1;
            }
          });
          res.json(data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
    post: (req, res) => {
      const {
        dishId, likesdish, userId, restaurantId,
      } = req.params;
      models.dishlikes.post(dishId, likesdish, userId, restaurantId)
        .then((results) => {
          res.json(results);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    },
  },

};

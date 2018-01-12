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
    upVote: (req, res) => {
      const {
        dishId, likesdish, userId, restaurantId,
      } = req.body;
      models.dishlikes.upVote(dishId, likesdish, userId, restaurantId)
        .then((results) => {
          console.log ('results:', results);
          res.json(results);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    },
    downVote: (req, res) => {
      const {
        dishId, likesdish, userId, restaurantId,
      } = req.body;
      models.dishlikes.downVote(dishId, likesdish, userId, restaurantId)
        .then((results) => {
          console.log ('results:', results);
          res.json(results);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    },
  },

};

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
    photo: (req, res) => {
      res.send('image uploaded');
    },
    submit: (req, res) => {
      const data = req.body;
      models.submit.restaurant(data)
        .then((id) => {
          data.restaurantId = id.rows[0].id;
          return id;
        })
        .catch(e => res.status(404).send(e))
        .then(() => models.submit.dish(data))
        .catch(e => res.status(404).send(e))
        .then((id) => {
          data.dishId = id.rows[0].id;
          return id;
        })
        .then(() => models.submit.post(data))
        .catch(e => res.status(404).send(e))
        .then(() => res.send('success'))
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
          results.rows.forEach((post) => {
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
  signup: {
    submit: (req, res) => {
      const { username, password } = req.body;
      models.users.findByUsername(username)
        .then((results) => {
          console.log(results);
          if (results.rows.length === 0) {
            models.users.create(username, password)
              .then(() => {
                res.redirect('/');
              })
              .catch((err) => {
                res.status(500).send(err);
              });
          } else {
            res.send({ message: 'username already exists. Please log in.' });
          }
        });
    },
  },
};

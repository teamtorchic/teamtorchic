const models = require('../models');

module.exports = {
  comments: {
    get: (req, res) => {
      const { post } = req.query;
      models.comments.get(post).then(results => res.json(results));
    },
    post: (data, res) => {
      models.comments.post(data.body).then(() => res.send('success')).catch(err => console.log(err));
    },
  },
  dishes: (req, res) => {
    models.dishes().then(results => res.json(results));
  },
  restaurants: (req, res) => {
    models.restaurants().then(results => res.json(results));
  },
  post: {
    getAll: (req, res) => {
      models.post.getAll()
        .then((results) => {
          results = JSON.parse(JSON.stringify(results.rows));
          res.body = {};
          res.body.data = results;
          const Promises = results.map((post) => {
            const { dishid } = post;
            return models.dishlikes.get(dishid);
          });
          return Promise.all(Promises);
        })
        .then((results) => {
          results = results.map(result => result.rows);
          results.forEach((dish, i) => {
            const vote = {
              upvote: 0,
              downvote: 0,
            };
            dish.forEach((votes) => {
              if (votes.likesdish) {
                vote.upvote += 1;
              } else if ((votes.likesdish === 0)) {
                vote.downvote += 1;
              }
            });
            res.body.data[i].votes = vote;
          });
          console.log('req.user', req.user);
          res.json(res.body.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
    submit: (req, res) => {
      const data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      } else {
        data.image = null;
      }
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
        .then(() => res.send('successful post'))
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
          if (results.rowCount === 0) {
            models.users.create(username, password)
              .then(() => {
                res.redirect(`/users/${req.body.username}`);
              })
              .catch((err) => {
                res.status(500).send(err);
              });
          } else {
            res.send({ message: 'username already exists' });
          }
        });
    },
  },
  user: {
    landing: (req, res) => {
      res.redirect(`/users/${req.body.username}`);
    },
  },
};

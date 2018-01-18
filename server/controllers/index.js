const models = require('../models');
const { sortByRating, countLikes } = require('../utils');
module.exports = {
  likes: {
    get: (req, res) => {
      const data = req.query;
      models.likes.get(data).then((queryResults) => {
        let userLiked = false;
        queryResults.rows.forEach((row) => {
          if (row.userid == data.user) {
            userLiked = true;
          }
        });

        const results = {
          count: queryResults.rows.length,
          usersLike: userLiked,
        };
        res.json(results);
      });
    },
    post: (req, res) => {
      const data = req.body;
      models.likes.post(data).then(results => res.json(results));
    },
  },
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
          const data = countLikes(results);
          data.forEach((postData, i) => {
            res.body.data[i].upvoteUsers = postData.upvoteUsers;
            res.body.data[i].downvoteUsers = postData.downvoteUsers;
            res.body.data[i].votes = postData.votes;
          });
          res.json(res.body.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
    getByUsername: (req, res) => {
      const { username } = req.params;
      models.post.getByUsername(username)
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
          const data = countLikes(results);
          data.forEach((postData, i) => {
            res.body.data[i].upvoteUsers = postData.upvoteUsers;
            res.body.data[i].downvoteUsers = postData.downvoteUsers;
            res.body.data[i].votes = postData.votes;
          });
          res.json(res.body.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
    getByDish: (req, res) => {
      const { dishname } = req.params;
      models.post.getByDish(dishname)
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
          const data = countLikes(results);
          data.forEach((postData, i) => {
            res.body.data[i].upvoteUsers = postData.upvoteUsers;
            res.body.data[i].downvoteUsers = postData.downvoteUsers;
            res.body.data[i].votes = postData.votes;
          });
          res.json(res.body.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
    getByRestaurant: (req, res) => {
      const { name } = req.params;
      models.post.getByRestaurant(name)
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
          const data = countLikes(results);
          data.forEach((postData, i) => {
            res.body.data[i].upvoteUsers = postData.upvoteUsers;
            res.body.data[i].downvoteUsers = postData.downvoteUsers;
            res.body.data[i].votes = postData.votes;
          });
          res.json(res.body.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
    getByRating: (req, res) => {
      console.log ('hi')
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
          console.log ('succu')
          const data = countLikes(results);
          data.forEach((postData, i) => {
            res.body.data[i].upvoteUsers = postData.upvoteUsers;
            res.body.data[i].downvoteUsers = postData.downvoteUsers;
            res.body.data[i].votes = postData.votes;
          });
          res.json(res.body.data);
        })
        .catch((err) => {
          console.log(err);
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
      if (data.recipe.length > 0) {
        models.submit.recipe(data)
          .then(() => res.send('successful post'))
          .catch((err) => {
            res.status(404).send(err);
          });
      } else {
        models.submit.restaurant(data)
          .then((id) => {
            data.restaurantId = id.rows[0].id;
            return data.restaurantId;
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
      }
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
        dishid, likesdish, userid, restaurantid,
      } = req.body;
      models.dishlikes.upVote(dishid, likesdish, userid, restaurantid)
        .then((results) => {
          res.json(results);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    },
    downVote: (req, res) => {
      const {
        dishid, likesdish, userid, restaurantid,
      } = req.body;
      models.dishlikes.downVote(dishid, likesdish, userid, restaurantid)
        .then((results) => {
          res.json(results);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    },
  },
  user: {
    getProfile: (req, res) => {
      const { username } = req.params;
      models.users.getProfile(username)
        .then((results) => {
          res.json(results);
        })
        .catch((err) => {
          res.status(401).send(err);
        });
    },
  },
};

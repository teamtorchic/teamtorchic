const models = require('../models');

const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json

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
  },
};

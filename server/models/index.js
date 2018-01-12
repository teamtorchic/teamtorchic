const db = require('../../database');

db.client.connect();

module.exports = {
  post: {
    getAll: () => db.pool.connect().then(client => client.query('select * from posts')),
  },
  dishlikes: {
    get: (dishId) => {
      const dishlikes = {
        text: 'select * from posts inner join dishes on dishes.id = posts.dishId where dishes.id = $1',
        values: [dishId],
      };
      return db.client.query(dishlikes);
    },
    upVote: (dishId, likesDish, userId, restaurantId) => {
      const checkVote = {
        text: 'select likesDish, id from posts where userId = $1 and dishId = $2',
        values: [userId, dishId],
        rowMode: 'array',
      };
      const insertVote = {
        text: 'insert into posts (likesDish, userId, dishId, restaurantId) values ($1, $2, $3, $4)',
        values: [dishId, likesDish, userId, restaurantId],
      };
      return db.client.query(checkVote)
        .then((data) => {
          if (data.rows.length) {
            let islike = data.rows[0][0];
            const updateId = data.rows[0][1];
            if (islike) {
              islike = null;
            } else {
              islike = 1;
            }
            const updateUpVote = {
              text: 'update posts set likesDish = $1 where id = $2',
              values: [islike, updateId],
            };
            return db.client.query(updateUpVote);
          }
          return db.client.query(insertVote);
        });
    },
    downVote: (dishId, likesDish, userId, restaurantId) => {
      const checkVote = {
        text: 'select likesDish, id from posts where userId = $1 and dishId = $2',
        values: [userId, dishId],
        rowMode: 'array',
      };
      const insertVote = {
        text: 'insert into posts (likesDish, userId, dishId, restaurantId) values ($1, $2, $3, $4)',
        values: [dishId, likesDish, userId, restaurantId],
      };
      return db.client.query(checkVote)
        .then((data) => {
          if (data.rows.length) {
            let notLike = data.rows[0][0];
            const updateId = data.rows[0][1];
            if (notLike === 0) {
              notLike = null;
            } else {
              notLike = 0;
            }
            const updateDownVote = {
              text: 'update posts set likesDish = $1 where id = $2',
              values: [notLike, updateId],
            };
            return db.client.query(updateDownVote);
          }
          return db.client.query(insertVote);
        });
    },
  },
};

const db = require('../../database');

db.client.connect();

module.exports = {
  post: {
    getAll: () => db.pool.connect().then(client => client.query('select * from posts')),
  },
  dishlikes: {
    get: (dishId) => {
      const dishlikes = {
        text: 'select likesDish from posts inner join dishes on dishes.id = posts.dishId where dishes.id = $1',
        values: [dishId],
      };
      return db.client.query(dishlikes);
    },
    post: (dishId, likesDish, userId, restaurantId) => {
      const voteDishLikes = {
        text: 'insert into posts (likesDish, userId, dishId, restaurantId) values ($1, $2, $3, $4)',
        values: [dishId, likesDish, userId, restaurantId],
      };
      return db.client.query(voteDishLikes);
    },
  },
};

const db = require('../../database');

db.connect();

module.exports = {
  post: {
    getAll: () => db.query('select * from posts'),
  },
  dishlikes: {
    get: (dishId) => {
      const dishlikes = {
        text: 'select likesDish from posts inner join dishes on dishes.id = posts.dishId where dishes.id = $1',
        values: [dishId],
      };
      return db.query(dishlikes);
    },
  },
};

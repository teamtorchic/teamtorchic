const db = require('../../database');

db.client.connect();

module.exports = {
  post: {
    getAll: () => db.pool.connect()
                      .then((client) => {
                        return client.query('select * from posts');
                      })
  },
  dishlikes: {
    get: (dishId) => {
      const dishlikes = {
        text: 'select likesDish from posts inner join dishes on dishes.id = posts.dishId where dishes.id = $1',
        values: [dishId],
      };
      return db.client.query(dishlikes);
    },
    // post: (dishId, value) => {
    //   const VoteDishLikes = {
    //     text: 'insert into posts ',
    //     values: [dishId, value],
    //   };
    // }
  },
};

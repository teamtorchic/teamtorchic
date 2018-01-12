const db = require('../../database');

db.connect();

module.exports = {
  post: {
    getAll: () => db.query('select * from posts'),
  },
  submit: {
    dish: ({ dish }) => {
      return db.query(`insert into dishes (name) values ('${dish}') ON CONFLICT (name) DO UPDATE SET name='${dish}' RETURNING id`);
    },
    restaurant: ({ restaurant }) => {
      const query = `insert into restaurants (name) values ('${restaurant}') ON CONFLICT (name) DO UPDATE SET name='${restaurant}' RETURNING id`;
      console.log('restaurant quer2y: ', query);
      return db.query(query);
    },
    menu: (data) => {
      const query = `insert into menus (dishId, restaurantId) values ('${data.dishId}', '${data.restaurantId}') ON CONFLICT DO NOTHING`;
      console.log('menu query: ', query);
      return db.query(query);
    },
    post: (data) => {
      let likesDish;
      if (data.likes === 'likes') {
        likesDish = 1;
      } else if (data.dislikes === 'dislikes') {
        likesDish = 0;
      } else {
        likesDish = null;
      }
      const query = `insert into posts (content, likesDish, userId, dishId, restaurantId) values ('${data.commentary}', ${likesDish}, 1, ${data.dishId}, ${data.restaurantId})`;
      console.log('post query: ', query);
      db.query(query);
    },
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

const db = require('../../database');

db.client.connect();

module.exports = {
  post: {
    getAll: () => {
      const getAllPost = {
        text: 'select content, posts.id, image, dishid, userid, restaurantid, likesdish, users.username, restaurants.name as restaurantname, dishes.name as dishname from posts inner join users on users.id = userid inner join restaurants on restaurants.id = restaurantid inner join dishes on dishes.id = dishid where (posts.content IS NOT NULL OR posts.image IS NOT NULL)',
      };
      return db.client.query(getAllPost);
    },
    getByUsername: (username) => {
      const getAllPostByUsername = {
        text: `select content, image, dishid, userid, restaurantid, likesdish, users.username, restaurants.name as restaurantname, dishes.name as dishname from posts inner join users on users.id = userid inner join restaurants on restaurants.id = restaurantid inner join dishes on dishes.id = dishid where users.username = '${username}' and content IS NOT NULL`,
      };
      return db.client.query(getAllPostByUsername);
    },
  },
  dishes: () => db.client.query('select * from dishes'),
  restaurants: () => db.client.query('select * from restaurants'),
  comments: {
    post: (comment) => {
      const encodedComment = comment.comment.replace("'", "''");
      const query = `insert into comments (content, userId, postId) values ('${encodedComment}', ${comment.userId}, ${comment.postId}) RETURNING id`;
      return db.client.query(query);
    },
    get: (post) => {
      const query = `select comments.*, users.username from comments left join users on comments.userId=users.id WHERE postId = ${post}`;
      console.log(query);
      return db.client.query(query);
    }
  },
  submit: {
    dish: ({ dish }) => db.client.query(`insert into dishes (name) values ('${dish}') ON CONFLICT (name) DO UPDATE SET name='${dish}' RETURNING id`),
    restaurant: ({ restaurant }) => {
      const query = `insert into restaurants (name) values ('${restaurant}') ON CONFLICT (name) DO UPDATE SET name='${restaurant}' RETURNING id`;
      return db.client.query(query);
    },
    menu: (data) => {
      const query = `insert into menus (dishId, restaurantId) values ('${data.dishId}', '${data.restaurantId}') ON CONFLICT DO NOTHING`;
      return db.client.query(query);
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
      const encodedCommentary = data.commentary.replace("'", "''");
      const query = `insert into posts (content, likesDish, userId, dishId, restaurantId, image) values ('${encodedCommentary}', ${likesDish}, 2, ${data.dishId}, ${data.restaurantId}, '${data.image}')`;
      return db.client.query(query);
    },
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
          if (data.rowCount) {
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
          if (data.rowCount) {
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
  users: {
    findByUsername: (username) => {
      const findUser = {
        text: 'select username from users where username = $1',
        values: [username],
        rowMode: 'array',
      };
      return db.client.query(findUser);
    },
    create: (username, password) => {
      const createUser = {
        text: 'insert into users (username, password) values ($1, $2)',
        values: [username, password],
        rowMode: 'array',
      };
      return db.client.query(createUser);
    },
    checkUserCredential: (username, password) => {
      const checkCredential = {
        text: 'select username from users where username = $1 and password = $2',
        values: [username, password],
        rowMode: 'array',
      };
      return db.client.query(checkCredential);
    },
    getProfile: (username) => {
      const getUserInfo = {
        text: 'select * from users where username = $1',
        value: [username],
      };
      return db.client.query(getUserInfo);
    },
  },
};

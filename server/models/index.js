const db = require('../../database');

db.client.connect();

module.exports = {
  post: {
    getAll: () => {
      const getAllPost = {
        text: 'select content, posts.id as postid, image, dishid, userid, restaurantid, likesdish, users.username, restaurants.name as restaurantname, dishes.name as dishname from posts inner join users on users.id = userid inner join restaurants on restaurants.id = restaurantid inner join dishes on dishes.id = dishid where (posts.content IS NOT NULL OR posts.image IS NOT NULL)',
      };
      return db.client.query(getAllPost);
    },
    getByUsername: (username) => {
      const getAllPostByUsername = {
        text: `select content, posts.id as postid, image, dishid, userid, restaurantid, likesdish, users.username, restaurants.name as restaurantname, dishes.name as dishname from posts inner join users on users.id = userid inner join restaurants on restaurants.id = restaurantid inner join dishes on dishes.id = dishid where users.username = '${username}' and content IS NOT NULL`,
      };
      return db.client.query(getAllPostByUsername);
    },
  },
  likes: {
    get: ({ post }) => {
      const query = `select * from likes WHERE postId=${post}`;
      return db.client.query(query);
    },
    post: ({ user, post, likes }) => {
      let query;
      if (likes) {
        query = `insert into likes (userId, postId) values (${user}, ${post}) RETURNING ID`;
      } else {
        query = `delete from likes WHERE (userId=${user} AND postId=${post})`;
      }
      return db.client.query(query);
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
      return db.client.query(query);
    },
  },
  submit: {
    recipe: (data) => {
       let likesDish;
       if (typeof data.likes === 'object') {
         likesDish = null;
       } else if (data.likes) {
         likesDish = 1;
       } else {
         likesDish = 0;
       }

       const encodedCommentary = data.commentary.replace("'", "''");
       const query = `insert into posts (content, likesDish, userId, recipe, image) values ('${encodedCommentary}', ${likesDish}, 2, '${data.recipe}', '${data.image}')`;
      console.log(query);
       return db.client.query(query);
    },
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
      if (typeof data.likes === 'object') {
        likesDish = null;
      } else if (data.likes) {
        likesDish = 1;
      } else {
        likesDish = 0;
      }

      const encodedCommentary = data.commentary.replace("'", "''");
      const query = `insert into posts (content, likesDish, userId, dishId, restaurantId, image) values ('${encodedCommentary}', ${likesDish}, 2, ${data.dishId}, ${data.restaurantId}, '${data.image}')`;
      return db.client.query(query);
    },
  },
  dishlikes: {
    get: (dishid) => {
      const dishlikes = {
        text: 'select * from posts inner join dishes on dishes.id = posts.dishId where dishes.id = $1',
        values: [dishid],
      };
      return db.client.query(dishlikes);
    },
    upVote: (dishid, likesdish, userid, restaurantid) => {
      const checkVote = {
        text: 'select likesdish, id from posts where userid = $1 and dishid = $2',
        values: [userid, dishid],
        rowMode: 'array',
      };
      const insertVote = {
        text: 'insert into posts (likesdish, userid, dishid, restaurantid) values ($1, $2, $3, $4)',
        values: [likesdish, userid, dishid, restaurantid],
      };
      return db.client.query(checkVote)
        .then((data) => {
          if (data.rowCount) {
            let islike = data.rows[0][0];
            const targetpost = data.rows[0][1];
            if (islike) {
              islike = null;
            } else {
              islike = 1;
            }
            const updateUpVote = {
              text: 'update posts set likesdish = $1 where id = $2',
              values: [islike, targetpost],
            };
            return db.client.query(updateUpVote);
          }
          return db.client.query(insertVote);
        });
    },
    downVote: (dishid, likesdish, userid, restaurantid) => {
      const checkVote = {
        text: 'select likesdish, id from posts where userid = $1 and dishid = $2',
        values: [userid, dishid],
        rowMode: 'array',
      };
      const insertVote = {
        text: 'insert into posts (likesdish, userid, dishid, restaurantid) values ($1, $2, $3, $4)',
        values: [likesdish, userid, dishid, restaurantid],
      };
      return db.client.query(checkVote)
        .then((data) => {
          if (data.rowCount) {
            let notlike = data.rows[0][0];
            const target = data.rows[0][1];
            if (notlike === 0) {
              notlike = null;
            } else {
              notlike = 0;
            }
            const updateDownVote = {
              text: 'update posts set likesdish = $1 where id = $2',
              values: [notlike, target],
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
      };
      return db.client.query(findUser);
    },
    create: (username, password) => {
      const createUser = {
        text: 'insert into users (username, password) values ($1, $2)',
        values: [username, password],
      };
      return db.client.query(createUser);
    },
    checkUserCredential: (username, password) => {
      const checkCredential = {
        text: 'select username from users where username = $1 and password = $2',
        values: [username, password],
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
    getUserId: (username) => {
      const getUserId = {
        text: 'select id from users where username = $1',
        values: [username],
      };
      return db.client.query(getUserId);
    },
  },
};

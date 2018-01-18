module.exports = {
  countLikes: (results) => {
    const data = results.map(result => result.rows);
    const output = [];
    data.forEach((dish, i) => {
      const vote = {
        upvote: 0,
        downvote: 0,
      };
      const upvoteUsers = [];
      const downvoteUsers = [];
      dish.forEach((votes) => {
        if (votes.likesdish) {
          vote.upvote += 1;
          upvoteUsers.push(votes.userid);
        } else if ((votes.likesdish === 0)) {
          vote.downvote += 1;
          downvoteUsers.push(votes.userid);
        }
      });
      output[i] = {};
      output[i].upvoteUsers = upvoteUsers;
      output[i].downvoteUsers = downvoteUsers;
      output[i].votes = vote;
    });
    return output;
  },
  sortByRating: (posts) => {
    const sortable = [];
    posts.forEach((post) => {
      sortable.push([post, post.votes.upvoteUsers]);
    });
    sortable.sort((a, b) => {
      if (a[1] < b[1]) {
        return -1;
      }
      return a[1] > b[1];
    });
    return sortable.map(post => post[0]);
  },
};

import React from 'react';
import Comment from './comment';

const Post = (props) => {
  const {
    handleClick,
    post,
    user,
    id,
  } = props;
  const {
    postid,
    content,
    likesdish,
    dishname,
    dishid,
    image,
    restaurantid,
    restaurantname,
    userid,
    username,
    upvoteUsers,
    downvoteUsers,
    votes,
  } = post;

  return (
    <div className="post-ele">
      <article className="ele">
        <p>{username}
          {likesdish === 1 ? ' likes ' : null }
          {likesdish === 0 ? ' dislikes ' : null}
          {likesdish === null ? ' doesn\'t care for ' : null}
          {dishname} at {restaurantname}
        </p>
        {image && <img className="image" alt="post" src={`/images/${image}`} />}
        <div className="content-ele">{content}</div>
      </article>
      <Comment
        upvoteUsers={upvoteUsers}
        downvoteUsers={downvoteUsers}
        restaurantid={restaurantid}
        dishid={dishid}
        likesdish={likesdish}
        post={postid}
        currentUser={id}
        votes={votes}
        handleClick={handleClick}
      />
    </div>
  );
// }
};

export default Post;

import React from 'react';

const Post = (props) => (
  <div className="post-ele">
    <article className="ele">
      <p>{props.fakeData.userIDUsername} {props.fakeData.likesDish} {props.fakeData.dishIdDishes}</p>
      <p><img className="image" src={props.fakeData.image}/></p>
      <p>{props.fakeData.content}</p>
      <p>Likes: {props.fakeData.likes}</p>
    </article>
  </div>
);
export default Post;

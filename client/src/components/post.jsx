import React from 'react';

const Post = props => (
  <div className="post-ele">
    <article className="ele">
      <p>{props.postData.userid} likes {props.postData.dishid}</p>
      <p><img className="image" src={props.postData.image} /></p>
      <p><i className="material-icons">favorite_border</i> {props.votesPos.upvote}
        <i className="material-icons">mood_bad</i> {props.votesNeg.downvote}
        {props.postData.content}
      </p>
    </article>
  </div>
);
export default Post;

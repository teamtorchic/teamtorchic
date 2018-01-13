import React from 'react';

const Post = props => (
  <div className="post-ele">
    <article className="ele">
      <p>{props.postData.userid} likes {props.postData.dishid}</p>
      <p><img className="image" src={props.postData.image} /></p>
      <p><i onClick={props.clickyclick('like')} className="material-icons">favorite_border</i>
        {props.votesPos.upvote}
        <i className="material-icons">mood_bad</i>
          {props.votesNeg.downvote}
        <span className="content-ele">{props.postData.content}</span>
      </p>
    </article>
  </div>
);
export default Post;

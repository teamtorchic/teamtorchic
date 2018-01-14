import React from 'react';
import PropTypes from 'prop-types';

const Post = props => (
  <div className="post-ele">
    <article className={`ele ${props.postId}`}>
      <p>{props.postUserid} likes {props.postDishid}</p>
      <p><img className="image" alt="post" src={props.postImage} /></p>
      <p>
        <i onClick={() => props.clickyclick('like')}
          className="material-icons">
      favorite_border
        </i>
        {props.votesPos}
        <i onClick={() => props.clickyclick('dislike')}
          className="material-icons">
          mood_bad
        </i>
        {props.votesNeg}
        <span className="content-ele">{props.postContent}</span>
      </p>
    </article>
  </div>
);

Post.propTypes = {
  postId: PropTypes.number,
  postUserid: PropTypes.string,
  postDishid: PropTypes.string,
  postImage: PropTypes.string,
  clickyclick: PropTypes.func,
  votesNeg: PropTypes.func,
  votesPos: PropTypes.func,
  postContent: PropTypes.string,
};

Post.defaultProps = {
  postId: PropTypes.number,
  postUserid: PropTypes.string,
  postDishid: PropTypes.string,
  postImage: PropTypes.string,
  clickyclick: PropTypes.func,
  votesNeg: PropTypes.func,
  votesPos: PropTypes.func,
  postContent: PropTypes.string,
};

export default Post;

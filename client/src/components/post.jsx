import React from 'react';
import PropTypes from 'prop-types';

const Post = props => (
  <div className="post-ele">
    <article className="ele">
      <p>{props.postUserid}
        {props.likeylike === 1 ? ' likes ' : null }
        {props.likeylike === 0 ? ' dislikes ' : null}
        {props.likeylike === null ? ' doesn\'t care for ' : null}
        {props.postDishid}
      </p>
      <p><img className="image" alt="post" src={props.postImage} /></p>
      <p>
        <i
          onClick={() => props.clickyclick(props, 'like')}
          role="presentation"
          onKeyDown={() => props.clickyclick(props, 'like')}
          className="material-icons"
        >
      favorite_border
        </i>
        {props.votesPos}
        <i
          onClick={() => props.clickyclick(props, 'dislike')}
          role="presentation"
          onKeyUp={() => props.clickyclick(props, 'dislike')}
          className="material-icons"
        >
          mood_bad
        </i>
        {props.votesNeg}
        <span className="content-ele">{props.postContent}</span>
      </p>
    </article>
  </div>
);

Post.propTypes = {
  postUserid: PropTypes.string,
  likeylike: PropTypes.number,
  postDishid: PropTypes.string,
  postImage: PropTypes.string,
  clickyclick: PropTypes.func,
  votesNeg: PropTypes.number,
  votesPos: PropTypes.number,
  postContent: PropTypes.string,
};

Post.defaultProps = {
  postUserid: PropTypes.string,
  likeylike: PropTypes.number,
  postDishid: PropTypes.string,
  postImage: PropTypes.string,
  clickyclick: PropTypes.func,
  votesNeg: PropTypes.number,
  votesPos: PropTypes.number,
  postContent: PropTypes.string,
};

export default Post;

import React from 'react';
import PropTypes from 'prop-types';
import Comment from './comment';

const Post = props => (
  <div className="post-ele">
    <article className="ele">
      <p>{props.postUserid}
        {props.likeylike === 1 ? ' likes ' : null }
        {props.likeylike === 0 ? ' dislikes ' : null}
        {props.likeylike === null ? ' doesn\'t care for ' : null}
        {props.postDish}
      </p>
      <p><img className="image" alt="post" src={props.postImage} /></p>
      <p>
        <i
          onClick={() => props.clickyclick(props, 'like')}
          role="presentation"
          onKeyDown={() => props.clickyclick(props, 'like')}
          className="material-icons"
          id={props.likeylike === 1 ? 'likes-selected' : null}
        >
      favorite_border
        </i>
        {props.votesPos}
        <i
          onClick={() => props.clickyclick(props, 'dislike')}
          role="presentation"
          onKeyUp={() => props.clickyclick(props, 'dislike')}
          className="material-icons"
          id={props.likeylike === 0 ? 'dislikes-selected' : null}
        >
          mood_bad
        </i>
        {props.votesNeg}
        <span className="content-ele">{props.postContent}</span>
      </p>
    </article>
    <Comment post={props.postData.id} />
  </div>
);

Post.propTypes = {
  postImage: PropTypes.string,
  clickyclick: PropTypes.func,
  votesNeg: PropTypes.number,
  votesPos: PropTypes.number,
  postContent: PropTypes.string,
};

Post.defaultProps = {
  postImage: PropTypes.string,
  clickyclick: PropTypes.func,
  votesNeg: PropTypes.number,
  votesPos: PropTypes.number,
  postContent: PropTypes.string,
};

export default Post;

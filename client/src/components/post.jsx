import React from 'react';
import Comment from './comment';


class Post extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      upvote: this.props.post.votes.upvote,
      downvote: this.props.post.votes.downvote,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.post.votes.upvote !== nextProps.post.votes.upvote) || (this.props.post.votes.downvote !== nextProps.post.votes.downvote)) {
      this.setState({
        upvote: nextProps.post.votes.upvote,
        downvote: nextProps.post.votes.downvote,
      });
    }
  }

  render() {
    console.log ("rendering", this.state);
    const {
      handleClick,
      post,
      user,
    } = this.props;
    const {
      id,
      content,
      likesdish,
      dishname,
      dishid,
      image,
      restaurantid,
      restaurantname,
      userid,
      username,
      votes,
    } = post;
    const { downvote, upvote } = this.state;
    return (
      <div className="post-ele">
        <article className="ele">
          <p>{username}
            {likesdish === 1 ? ' likes ' : null }
            {likesdish === 0 ? ' dislikes ' : null}
            {likesdish === null ? ' doesn\'t care for ' : null}
            {dishname}
          </p>
          <p><img className="image" alt="post" src={image} /></p>
          <p>
            <i
              onClick={() => handleClick({ restaurantid, dishid, likesdish }, 1)}
              role="presentation"
              onKeyDown={() => handleClick({ restaurantid, dishid, likesdish }, 1)}
              className="up material-icons"
              id={likesdish && user === username ?
                'likes-selected' : null}
            >
          favorite_border
            </i>
            {upvote}
            <i
              onClick={() => handleClick({ restaurantid, dishid, likesdish }, 0)}
              role="presentation"
              onKeyUp={() => handleClick({ restaurantid, dishid, likesdish }, 0)}
              className="material-icons"
              id={(likesdish === 0) && user === username ?
                'dislikes-selected' : null}
            >
              mood_bad
            </i>
            {downvote}
            <span className="content-ele">{content}</span>
          </p>
        </article>
        <Comment post={id} />
      </div>
    );
  }
}

export default Post;

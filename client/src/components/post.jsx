import React from 'react';
import Comment from './comment';


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvote: this.props.post.votes.upvote,
      downvote: this.props.post.votes.downvote,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.post.votes.upvote !== nextProps.post.votes.upvote)
    || (this.props.post.votes.downvote !== nextProps.post.votes.downvote)) {
      this.setState({
        upvote: nextProps.post.votes.upvote,
        downvote: nextProps.post.votes.downvote,
      });
    }
  }

  render() {
    const {
      handleClick,
      post,
      user,
      id,
    } = this.props;
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
    const { downvote, upvote } = this.state;
    return (
      <div className="post-ele">
        <article className="ele">
          <p>{username}
            {likesdish === 1 ? ' likes ' : null }
            {likesdish === 0 ? ' dislikes ' : null}
            {likesdish === null ? ' doesn\'t care for ' : null}
            {dishname} at {restaurantname}
          </p>
          <img className="image" alt="post" src={`/images/${image}`} />
          <p>
            <i
              onClick={() => handleClick({ restaurantid, dishid, likesdish }, 1)}
              role="presentation"
              onKeyDown={() => handleClick({ restaurantid, dishid, likesdish }, 1)}
              className="material-icons"
              id={upvoteUsers.includes(id) ?
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
              id={downvoteUsers.includes(id) ?
                'dislikes-selected' : null}
            >
              mood_bad
            </i>
            {downvote}
            <span className="content-ele">{content}</span>
          </p>
        </article>
        <Comment post={postid} currentUser={this.props.id} dishId={dishid} />
      </div>
    );
  }
}

export default Post;

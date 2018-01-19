import React from 'react';
import $ from 'jquery';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      comments: [],
      displayReviews: false,
      reviews: [],
      likes: 0,
      userLikes: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.showReviews = this.showReviews.bind(this);
    this.hideReviews = this.hideReviews.bind(this);
    this.getReviews();

    $.get({
      url: '/comments',
      data: { post: this.props.post },
      contentType: 'application/json',
    }).done((data) => {
      this.setState({ comments: data.rows });
    });
    $.get({
      url: '/likes',
      data: { post: this.props.post, user: this.props.currentUser },
      contentType: 'application/json',
    }).done((data) => {
      this.setState({ likes: data.count, userLikes: data.usersLike });
    });
  }

  getReviews() {
    $.get({
      url: '/reviews',
      data: { post: this.props.post, dish: this.props.dishid },
      contentType: 'application/json',
    }).done((data) => {
      this.setState({ reviews: data });
    });
  }

  handleLike() {
    const newOpinion = !this.state.userLikes;
    $.post({
      url: '/likes',
      data: JSON.stringify({
        likes: newOpinion,
        post: this.props.post,
        user: this.props.currentUser,
      }),
      contentType: 'application/json',
    });

    if (this.state.userLikes) {
      this.setState({ likes: this.state.likes - 1 });
    } else {
      this.setState({ likes: this.state.likes + 1 });
    }

    this.setState({ userLikes: !this.state.userLikes });
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }
  showReviews() {
    this.setState({ displayReviews: true });
  }
  hideReviews() {
    this.setState({ displayReviews: false });
  }

  handleEnter(event) {
    if (event.key === 'Enter') {
      const content = event.target.value;
      $.post({
        url: '/comments',
        contentType: 'application/json',
        data: JSON.stringify({
          comment: content,
          userId: this.props.currentUser,
          postId: this.props.post,
        }),
      }).done(() => {
        this.setState({ comment: '' });
        $.get({
          url: '/comments',
          data: { post: this.props.post },
          contentType: 'application/json',
        }).done((data) => {
          this.setState({ comments: data.rows });
        });
      });
    }
  }

  render() {
    const comments = this.state.comments.map(comment => (
      <li
        className="comment"
        key={comment.id}
      >
        <span>@{comment.username}:</span>
        {comment.content}
      </li>));
    const reviews = this.state.reviews.map(review => (
      <li className="review" key={review.id}>@{review.username}: {review.content}</li>));
    const {
      currentUser,
      restaurantid,
      dishid,
      likesdish,
      handleClick,
      votes,
      upvoteUsers,
      downvoteUsers,
    } = this.props;
    const { upvote, downvote } = votes;
    return (
      <div className="comments">
        <div className="row">
          <div className="col-6">
            <div className="btn-group">
              <button
                onClick={this.handleLike}
                className="btn btn-outline-secondary likes-button"
                type="button"
              >
                <i className={`material-icons ${this.state.userLikes}`}>favorite_border</i>&nbsp;{this.state.likes}
              </button>
              <button className="btn btn-outline-secondary" type="button">
                <i
                  onClick={() => handleClick({ restaurantid, dishid, likesdish }, 1)}
                  role="presentation"
                  onKeyDown={() => handleClick({ restaurantid, dishid, likesdish }, 1)}
                  className="material-icons"
                  id={upvoteUsers.includes(currentUser) ?
                    'likes-selected' : null}
                >
            insert_emoticon
                </i>
                {upvote}
              </button>
              <button className="btn btn-outline-secondary" type="button">
                <i
                  onClick={() => handleClick({ restaurantid, dishid, likesdish }, 0)}
                  role="presentation"
                  onKeyUp={() => handleClick({ restaurantid, dishid, likesdish }, 0)}
                  className="material-icons"
                  id={downvoteUsers.includes(currentUser) ?
                    'dislikes-selected' : null}
                >
              mood_bad
                </i>
                {downvote}
              </button>
            </div>
          </div>
          <div className="col-6">
            <div className="btn-group">
              {(this.state.comments.length > 0) &&
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                >
                  <i className="material-icons">message</i>&nbsp;{this.state.comments.length}
                </button>}
              {(this.state.reviews.length > 0) &&
              <button
                type="button"
                onClick={this.showReviews}
                className="btn btn-outline-secondary"
              >
                <i className="material-icons">star_rate</i>&nbsp;{this.state.reviews.length}
              </button>}
            </div>
          </div>
        </div>
        { !this.state.displayReviews && <ul>{comments}</ul>}
        { this.state.displayReviews && <ul>{reviews}</ul>}
        <textarea
          placeholder="Leave a comment..."
          className="leaveComment form-control"
          value={this.state.comment}
          onChange={this.handleChange}
          onKeyPress={this.handleEnter}
        />
      </div>);
  }
}

export default Comment;

/* eslint react/prop-types: "off" */

import React from 'react';
import $ from 'jquery';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      comments: [],
      reviews: [],
      likes: 0,
      userLikes: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleLike = this.handleLike.bind(this);

    console.log('posts ', this.props.post);

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
      console.log(data);
      this.setState({ likes: data.count, userLikes: data.usersLike });
    });
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  handleLike() {
    const newOpinion = !this.state.userLikes;
    $.post({
      url: '/likes',
      data: JSON.stringify({ likes: newOpinion, post: this.props.post, user: this.props.currentUser }),
      contentType: 'application/json',
    });

    if (this.state.userLikes) {
      this.setState({ likes: this.state.likes - 1 });
    } else {
      this.setState({ likes: this.state.likes + 1 });
    }

    this.setState({ userLikes: !this.state.userLikes });
  }

  handleEnter(event) {
    if (event.key === 'Enter') {
      console.log('this.state.currentUser = ', this.state.currentUser);
      const content = event.target.value;
      $.post({
        url: '/comments',
        contentType: 'application/json',
        data: JSON.stringify({ comment: content, userId: this.props.currentUser, postId: this.props.post }),
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
      <li className="comment" key={comment.id}>@{comment.username}: {comment.content}</li>));

    return (
      <div className="comments">
        <div className="row">
          <div className="col-10">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <button
                  onClick={this.handleLike}
                  className="btn btn-outline-secondary likes-button"
                  type="button"
                >
                  <i className={`material-icons ${this.state.userLikes}`}>favorite_border</i>&nbsp;{this.state.likes}
                </button>
              </div>
              <button className="btn btn-outline-secondary" type="button">
                <i className="material-icons">mood</i> 7
              </button>
              <button className="btn btn-outline-secondary" type="button">
                <i className="material-icons">mood_bad</i> 2
              </button>
            </div>
          </div>
          <div className="col">
            <div className="input-group mb-3">
              {(this.state.comments.length > 0) &&
                <button
                  type="button"
                  className="form-control"
                  aria-label=""
                  aria-describedby="basic-addon1"
                ><i className="material-icons">message</i> {this.state.comments.length}
                </button>}
              {(this.state.reviews.length > 0) &&
              <button
                type="button"
                className="form-control"
                aria-label=""
                aria-describedby="basic-addon1"
              ><i className="material-icons">star_rate</i> {this.state.reviews.length}
              </button>}
            </div>
          </div>
        </div>

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

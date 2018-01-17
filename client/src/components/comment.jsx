/* eslint react/prop-types: "off" */

import React from 'react';
import $ from 'jquery';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      comments: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);

    console.log('posts ', this.props.post);

    $.get({
      url: '/comments',
      data: { post: this.props.post },
      contentType: 'application/json',
    }).done((data) => {
      this.setState({ comments: data.rows });
    });
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  handleEnter(event) {
    if (event.key === 'Enter') {
      const content = event.target.value;
      $.post({
        url: '/comments',
        contentType: 'application/json',
        data: JSON.stringify({ comment: content, userId: 2, postId: this.props.post }),
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
        <textarea
          placeholder="Leave a comment..."
          className="leaveComment form-control"
          value={this.state.comment}
          onChange={this.handleChange}
          onKeyPress={this.handleEnter}
        />
        {this.state.comments.length > 0 && <ul>{comments}</ul> }
      </div>);
  }
}

export default Comment;

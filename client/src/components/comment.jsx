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

    $.get({
      url: '/comments',
      data: { post: 2 },
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
      console.log('enter pressed');
      // console.log(content);
      $.post({
        url: '/comments',
        contentType: 'application/json',
        data: JSON.stringify({ comment: content, userId: 1, postId: 2 }),
      }).done(() => {
        this.setState({ comment: '' });
        $.get({
          url: '/comments',
          data: { post: 2 },
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
          className="leaveComment"
          value={this.state.comment}
          onChange={this.handleChange}
          onKeyPress={this.handleEnter}
        />
        {this.state.comments.length > 0 && <ul>{comments}</ul> }
      </div>);
  }
}

export default Comment;

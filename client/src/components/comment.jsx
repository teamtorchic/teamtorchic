import React from 'react';
import $ from 'jquery';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
    const content = this.state.comment;
    if (event.key === 'Enter') {
      $.post({
        url: '/submit',
        contentType: 'application/json',
        data: JSON.stringify({ comment: content }),
      }).done(() => {
        this.setState({ comment: '' });
      });
    }
  }

  render() {
    return (<textarea
      placeholder="Leave a comment..."
      className="leaveComment"
      onChange={this.handleChange}
    />);
  }
}

export default Comments;

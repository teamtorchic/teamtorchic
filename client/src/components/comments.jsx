import React from 'react';

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.handleCommentInput = this.handleCommentInput.bind(this);

    this.state = {
      comment: '',
    };
  }

  handleCommentInput(event) {
    this.setState({
      comment: event.target.value,
    });
  }

  render() {
    const style = {
      maxHeight: '75px',
      minHeight: '38px',
      resize: 'none',
      padding: '9px',
      boxSizing: 'border-box',
      fontSize: '15px',
    };

    return (
      <div>
        <div>
          <h3>Comments:</h3>
          <form onChange={this.handleCommentInput}>
            <textarea
              style={style}
              rows={10}
              defaultValue=""
              comment={this.state.comment}
              onChange={this.handleCommentInput}
            />
            <input type="submit" value="Post Comment" />
          </form>
        </div>
      </div>
    );
  }
}

export default Comments;

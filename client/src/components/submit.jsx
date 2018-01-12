import React from 'react';
import $ from 'jquery';

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: '',
      dislikes: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target.name === 'like' && this.state.likes !== 'likes') {
      this.setState({ likes: 'likes', dislikes: '' });
    } else if (event.target.name === 'like' && this.state.likes === 'likes') {
      this.setState({ likes: '' });
    } else if (event.target.name === 'dislike' && this.state.dislikes !== 'dislikes') {
      this.setState({ likes: '', dislikes: 'dislikes' });
    } else {
      this.setState({ dislikes: '' });
    }
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit() {
    const postData = JSON.stringify(this.state);
    $.post({
      url: '/submit',
      data: postData,
      contentType: 'application/json',
    }).done(data => console.log('success', data));
  }

  render() {
    return (
      <div id="submit">
        <form>
          <div className="form-group row">
            <div className="col-5">
              <div id="dropzone"><i className="material-icons">add_a_photo</i></div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-3">
                    the
                </div>
                <div className="col">
                  <input
                    id="dish"
                    className="form-control"
                    onChange={this.handleChange}
                    placeholder="dish"
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                 at
                </div>
                <div className="col">
                  <input
                    id="restaurant"
                    className="form-control"
                    onChange={this.handleChange}
                    placeholder="the place"
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                 it was
                </div>
                <div className="col">
                  <textarea
                    id="commentary"
                    className="form-control"
                    onChange={this.handleChange}
                    placeholder="...delicious?"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <div className="btn-group">
                    <button
                      type="button"
                      className={`like-btn btn btn-default ${this.state.likes}`}
                      aria-label="Left Align"
                      name="like"
                      onClick={this.handleClick}
                      value="0"
                    >
                      <i id="like" className="material-icons like">favorite_border</i>
                    </button>
                    <button
                      type="button"
                      name="dislike"
                      className={`like-btn btn btn-default ${this.state.dislikes}`}
                      aria-label="Center Align"
                      onClick={this.handleClick}
                      id="dislikes{$this.state.likes}"
                    >
                      <i id="dislike" className="material-icons">mood_bad</i>
                    </button>
                  </div>
                </div>
                <div className="col">
                  <button
                    type="button"
                    id="submitButton"
                    className="btn btn-danger btn-block"
                    onClick={this.handleSubmit}
                  >
                  Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Submit;

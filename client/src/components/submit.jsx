/* global FormData */
/* global window */
/* eslint react/no-unused-state: "off" */

import React from 'react';
import $ from 'jquery';

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: '',
      dislikes: '',
      image: null,
      dish: '',
      restaurant: '',
      commentary: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  componentDidMount() {
    function dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    function dragover(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    const dropbox = document.getElementById('dropzone');
    dropbox.addEventListener('dragenter', dragenter, false);
    dropbox.addEventListener('dragover', dragover, false);
    dropbox.addEventListener('drop', this.handleDrop, false);
  }

  handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    const { files } = e.dataTransfer;
    const [file] = files;
    this.setState({ image: file, photoURL: window.URL.createObjectURL(file) });
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
    const postData = new FormData();

    Object.entries(this.state).forEach((pair) => {
      postData.append(pair[0], pair[1]);
    });

    $.post({
      url: '/submit',
      data: postData,
      processData: false,
      contentType: false,
    }).done(() => {
      this.setState({
        commentary: '',
        restaurant: '',
        dish: '',
        photoURL: undefined,
        likes: '',
        dislikes: '',
      });
    });
  }

  handleFiles() {
    const photo = document.getElementById('photoPicker').files[0];
    this.setState({ image: photo, photoURL: window.URL.createObjectURL(photo) });
  }

  render() {
    const dropzoneClick = (e) => {
      $('#photoPicker').click();
      e.preventDefault();
    };

    return (
      <div id="submit">
        <form onSubmit={this.handleSubmit} id="form" encType="multipart/form-data">
          <div className="form-group row">
            <div className="col-5">
              <input
                type="file"
                id="photoPicker"
                name="photo"
                accept="image/*"
                onChange={this.handleFiles}
              />
              <div
                id="dropzone"
                onClick={dropzoneClick}
                onKeyDown={dropzoneClick}
                role="button"
                tabIndex={0}
              >
                { this.state.photoURL &&
                <img alt="dish" src={this.state.photoURL} id="photoPreview" /> }
                { !this.state.photoURL && <i className="material-icons">add_a_photo</i> }
              </div>
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
                    value={this.state.dish}
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
                    value={this.state.restaurant}
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
                    value={this.state.commentary}
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
                    >
                      <i id="like" className="material-icons like">favorite_border</i>
                    </button>
                    <button
                      type="button"
                      name="dislike"
                      className={`like-btn btn btn-default ${this.state.dislikes}`}
                      aria-label="Center Align"
                      onClick={this.handleClick}
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

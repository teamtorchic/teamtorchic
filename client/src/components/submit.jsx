/* global FormData */
/* global window */

import React from 'react';
import $ from 'jquery';

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: '',
      dislikes: '',
      image: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.reset = this.reset.bind(this);
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

    const drop = (e) => {
      e.stopPropagation();
      e.preventDefault();

      const { files } = e.dataTransfer;
      const [file] = files;
      this.setState({ image: file });
      const photoURL = window.URL.createObjectURL(files[0]);
      $('#dropzone').html(`<img src="${photoURL}" id="photoPreview" />`);
    };

    const dropbox = document.getElementById('dropzone');
    dropbox.addEventListener('dragenter', dragenter, false);
    dropbox.addEventListener('dragover', dragover, false);
    dropbox.addEventListener('drop', drop, false);

    $('#dropzone').on('click', (e) => {
      $('#photoPicker').click();
      e.preventDefault();
    });
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

  reset() {
    this.setState({ likes: '', dislikes: '' });
  }

  handleSubmit() {
    const postData = this.state;
    if (this.state.image !== null) {
      const photo = this.state.image;
      postData.photo = photo.name;
      const photoData = new FormData();
      photoData.append('photo', photo);

      $.post({
        url: '/photo',
        data: photoData,
        processData: false,
        contentType: false,
      }).done(this.releasePhoto);
    }
    $.post({
      url: '/submit',
      data: JSON.stringify(postData),
      contentType: 'application/json',
    }).done(() => {
      $('#commentary').val('');
      $('#restaurant').val('');
      $('#dish').val('');
      $('#dropzone').html('');
      this.reset();
    });
  }

  handleFiles() {
    const photo = document.getElementById('photoPicker').files[0];
    this.setState({ image: photo });
    const photoURL = window.URL.createObjectURL(photo);
    $('#dropzone').html(`<img src="${photoURL}" id="photoPreview" />`);
  }

  render() {
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

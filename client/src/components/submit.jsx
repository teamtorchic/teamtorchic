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

  componentDidMount() {
    function handleFiles(files) {
      console.log('hi');
    }
    // function handleFiles(files) {
    //   for (let i = 0; i < files.length; i += 1) {
    //     const file = files[i];
    //
    //     if (!file.type.startsWith('image/')) {
    //       const img = document.createElement('img');
    //       img.classList.add('obj');
    //       img.file = file;
    //       const preview = document.getElementById('dropzone');
    //       preview.appendChild(img);
    //
    //       const reader = new FileReader();
    //       reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    //       reader.readAsDataURL(file);
    //     }
    //   }
    // }
    //
    // function dragenter(e) {
    //   e.stopPropagation();
    //   e.preventDefault();
    // }
    //
    // function dragover(e) {
    //   e.stopPropagation();
    //   e.preventDefault();
    // }
    //
    // function drop(e) {
    //   e.stopPropagation();
    //   e.preventDefault();
    //
    //   const { files } = e.dataTransfer;
    //
    //   handleFiles(files);
    // }

    // const dropbox = document.getElementById('dropzone');
    // dropbox.addEventListener('dragenter', dragenter, false);
    // dropbox.addEventListener('dragover', dragover, false);
    // dropbox.addEventListener('drop', drop, false);
    // dropbox.addEventListener('click', drop, false);

    $('#dropzone').on('click', (e) => {
      $('#photoPicker').click();
      e.preventDefault();
    });
  }

  render() {
    return (
      <div id="submit">
        <form>
          <div className="form-group row">
            <div className="col-5">
              <input type="file" id="photoPicker" accept="image/*" style="display:none" onchange="handleFiles(this.files)">
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

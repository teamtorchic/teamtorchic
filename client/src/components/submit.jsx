/* global FormData */
/* global window */
/* eslint react/no-unused-state: "off" */

import React from 'react';
import $ from 'jquery';
import io from 'socket.io-client';
import Suggestions from './suggestions';

const dishes = [
  { id: 1, name: 'chicken tikka masala' },
  { id: 2, name: 'general Tsou\'s Chicken' },
  { id: 3, name: 'fried chicken' },
  { id: 4, name: 'black bean chicken' },
  { id: 5, name: 'chicken katsu curry' },
];

const restaurants = [
  { id: 1, name: 'City View Restaurant' },
  { id: 2, name: 'Tommaso\'s' },
  { id: 3, name: 'The Slanted Door' },
  { id: 4, name: 'House of Nanking' },
  { id: 5, name: 'Hog Island Oyster Company' },
  { id: 6, name: 'Honey Honey' },
  { id: 7, name: 'Uncle Vito\'s Pizzeria' },
  { id: 8, name: 'Johnny Foley\'s' },
  { id: 9, name: 'Tommy\'s Joynt' },
  { id: 10, name: 'King Of Thai Noodle' },
  { id: 11, name: 'Calzone\'s Pizza Cucina' },
  { id: 12, name: 'Lers Ros Thai' },
  { id: 13, name: 'Little Delhi' },
  { id: 14, name: 'In-N-Out Burger' },
  { id: 15, name: 'Boudin Bakery' },
  { id: 16, name: 'Ghirardelli Ice Cream and Chocolate Shop' },
  { id: 17, name: 'Scoma\'s' },
  { id: 18, name: 'Brenda\'s French Soul Food' },
  { id: 19, name: 'The Cheesecake Factory' },
  { id: 20, name: '21st Amendment Brewery' },
  { id: 21, name: 'Amber' },
  { id: 22, name: 'Dottie\'s' },
  { id: 23, name: 'Sears Fine Food' },
  { id: 24, name: 'Honey Honey' },
  { id: 25, name: 'Thirsty Bear' },
  { id: 26, name: 'Farallon' },
];

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
      suggestedRestaurants: null,
      suggestedDishes: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.suggest = this.suggest.bind(this);
    this.endSuggest = this.endSuggest.bind(this);
    this.handleAcceptDish = this.handleAcceptDish.bind(this);
    this.handleAcceptRestaurant = this.handleAcceptRestaurant.bind(this);
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

    const socket = io.connect('http://localhost');

    socket.on('connect', () => {
      console.log('meow! we\'re connected');
    });


    // const restaurantSocket = io('/restaurant');
    // // const dishSocket = io('/dish');

    //
    // restaurantSocket.on('news', (data) => {
    //   console.log(data);
    //   restaurantSocket.emit('my other event', { my: 'data' });
    // });
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

  handleAcceptDish(event) {
    this.setState({ dish: event.target.value, suggestions: null, active: null });
  }

  handleAcceptRestaurant(event) {
    this.setState({ restaurant: event.target.value, suggestions: null, active: null });
  }

  suggest(event) {
    let options;
    const keyword = event.target.value;
    const type = event.target.id;
    if (type === 'restaurant') {
      options = restaurants.filter(restaurant => RegExp(keyword, 'i').test(restaurant.name));
    }
    if (type === 'dish') {
      options = dishes.filter(dish => (dish.name).match(keyword));
    }
    this.setState({ suggestions: options, active: type });
  }

  endSuggest() {
    this.setState({ active: null });
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
                    onKeyPress={this.suggest}
                    placeholder="dish"
                    type="text"
                  />
                  { this.state.suggestions && this.state.active === 'dish' &&
                  (<Suggestions
                    options={this.state.suggestions}
                    handleAccept={this.handleAcceptDish}
                    handleAdd={this.endSuggest}
                    item={this.state.dish}
                  />)}
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
                    onKeyPress={this.suggest}
                    onChange={this.handleChange}
                    placeholder="the place"
                    type="text"
                  />
                  { this.state.suggestions && this.state.active === 'restaurant' &&
                  <Suggestions
                    options={this.state.suggestions}
                    handleAccept={this.handleAcceptRestaurant}
                    handleAdd={this.endSuggest}
                    item={this.state.restaurant}
                  />}
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

import React from 'react';
import { client } from 'filestack-react';
import $ from 'jquery';

const filestack = client.init('ARd6jqM4xTeWWyfq9HBSXz');

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentary: '',
      dish: '',
      image: '',
      like: 0,
      restaurant: '',
      options: {
        fromSources: ['local_file_system', 'instagram'],
        accept: ['image/*'],
        transformations: {
          crop: { force: true },
        },
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
  /*  client.makeDropPane({
      id: 'dropzone',
      onSuccess: result => console.log(result),
    });*/
  }

  handleSubmit(event) {
    $.post(
      "localhost",
      { data: this.state },
      () => console.log('success'),
    );
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    return (
      <div id="submit">
        <form>
          <div className="form-group row">
            <div className="col">
              <div id="dropzone"><i className="material-icons">add_a_photo</i></div>
            </div>
            <div className="col">
                <div className="row">
                  <div className="col-3">
                    <label>the</label>
                  </div>
                  <div className="col">
                      <input id="dish" className="form-control" onChange={this.handleChange} placeholder="dish" type="text" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                   at
                  </div>
                  <div className="col">
                      <input id="restaurant" className="form-control" onChange={this.handleChange} placeholder="the place" type="text" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                   it was
                  </div>
                  <div className="col">
                    <textarea id="commentary" className="form-control"  onChange={this.handleChange} placeholder="...delicious?" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <div className="btn-group">
                      <button type="button" className="like-btn btn btn-default"
                        aria-label="Left Align">
                        <i className="material-icons like">favorite_border</i>
                      </button>
                      <button type="button" className="like-btn btn btn-default" aria-label="Center Align">
                        <i className="material-icons">mood_bad</i>
                      </button>
                    </div>
                  </div>
                    <div className="col">
                      <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>
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

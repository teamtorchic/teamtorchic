import React from 'react';
import { client } from 'filestack-react';

const filestack = client.init('ARd6jqM4xTeWWyfq9HBSXz');

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        fromSources: ['local_file_system', 'instagram'],
        accept: ['image/*'],
        transformations: {
          crop: { force: true },
        },
      },
    };
  }



  componentDidMount() {
  /*  client.makeDropPane({
      id: 'dropzone',
      onSuccess: result => console.log(result),
    });*/
  }

  render() {

    return (
      <div id="submit">
        <form>
          <div className="form-group row">
            <div className="btn-group">
              <button type="button" className="like-btn btn btn-default" aria-label="Left Align">
                <i className="material-icons like">favorite_border</i>
               </button>
               <button type="button" className="like-btn btn btn-default" aria-label="Center Align">
                 <i className="material-icons">mood_bad</i>
               </button>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-addon" id="basic-addon1">the</span>
                </div>
                <input className="form-control" placeholder="dish" type="text" />
                <div className="input-group-prepend">
                  <span className="input-group-addon" id="basic-addon1">at the</span>
                </div>
              <input className="form-control" placeholder="the place." type="text" />
            </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <textarea className="form-control" placeholder="And it was..." />
            </div>
            <div className="col">
              <div id="dropzone"><i class="material-icons">add_a_photo</i></div>

        {




          /*     <ReactFilestack
                apikey="ARd6jqM4xTeWWyfq9HBSXz"
                buttonText="Click me"
                buttonClass="imageUpload"
                options={this.state.options}
                onSuccess={this.yourCallbackFunction}
              /> */}
            </div>
          </div>
        </form>
      </div>
    );
  }

}



export default Submit;

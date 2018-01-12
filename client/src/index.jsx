import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Header from './components/header';
import Submit from './components/submit';
import Posts from './components/posts';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Header />
        <Submit />
        <Posts />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

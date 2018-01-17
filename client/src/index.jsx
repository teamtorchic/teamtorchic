import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Submit from './components/submit';
import Posts from './components/posts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      posts: [],
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    $.get({
      url: '/session',
      success: (data) => {
        if (data) {
          this.setState({
            user: data,
          });
          $.get({
            url: `/${this.state.user}`,
            success: (data) => {
              this.setState({
                posts: data,
              });
              console.log("indexSTate:", this.state);
            },
            err: (err) => {
              console.log(err);
            },
          });
        } else {
          $.get({
            url: '/posts',
            success: (data) => {
              this.setState({
                posts: data,
              });
            },
          });
        }
      },
      err: (err) => {
        console.log(err);
      },
    });
  }

  handleLogin(user) {
    this.setState({ user });
  }

  handleLogout() {
    $.get({
      url: '/posts',
      success: (data) => {
        this.setState({
          posts: data,
          user: null,
        });
      },
    });
  }

  render() {
    return (
      <div>
        <div id="header">
          <Header user={this.state.user} handleLogin={this.handleLogin} />
          { this.state.user && <button onClick={this.handleLogout}> Logout</button> }
        </div>
        {this.state.user && <Submit user={this.state.user} />}
        <Posts user={this.state.user} posts={this.state.posts} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

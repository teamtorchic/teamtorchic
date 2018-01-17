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
      id: null,
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
            user: data.user,
            id: data.id,
          });
          $.get({
            url: '/posts',
            success: (data) => {
              this.setState({
                posts: data,
              });
              console.log("Logged in user state:", this.state);
            },
            err: (err) => {
              console.log(err);
            },
          });
        } else {
          $.get({
            url: '/home',
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
      url: '/logout',
      success: (data) => {
        this.setState({
          user: null,
          id: null,
        });
      },
    });
  }

  render() {
    console.log ("visitor user state:", this.state);
    return (
      <div>
        <div id="header">
          <Header user={this.state.user} handleLogin={this.handleLogin} />
          { this.state.user && <button onClick={this.handleLogout}> Logout</button> }
        </div>
        {this.state.user && <Submit user={this.state.user} />}
        <Posts user={this.state.user} id={this.state.id} posts={this.state.posts} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

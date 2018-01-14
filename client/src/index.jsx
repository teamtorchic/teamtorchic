import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Submit from './components/submit';
import Posts from './components/posts';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(user) {
    this.setState({ user });
  }

  handleLogout() {
    this.setState({
      user: null,
    });
  }

  render() {
    return (
      <div>
        { this.state.user && <button onClick={this.handleLogout}> Logout</button> }
        <Header
          user={this.state.user}
          handleLogin={this.handleLogin}
        />
        <Submit />
        <Posts />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

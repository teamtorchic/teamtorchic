import React from 'react';
import $ from 'jquery';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      loginUnsuccessful: false,
    };
    this.validateLogin = this.validateLogin.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  validateLogin(e) {
    e.preventDefault();
    const { handleLogin, changeView } = this.props;
    $.post({
      url: '/login',
      contentType: 'application/json',
      data: JSON.stringify({ username: this.state.username, password: $('#password').val() }),
      success: (result) => {
        if (result.message !== 'Incorrect username or password' && result.message !== 'Missing credentials') {
          handleLogin(result.message);
          changeView();
        } else {
          this.setState({
            username: '',
            loginUnsuccessful: result.message,
          });
        }
        $('#password').val('');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleOnChange(e) {
    if (e.target.name === 'username') {
      this.setState({
        username: e.target.value,
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.validateLogin}>
        <label> Username: </label>
        <input
          name="username"
          type="text"
          placeholder="username"
          value={this.state.username}
          onChange={this.handleOnChange}
        />
        <br />
        <label> Password: </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
        />
        <br />
        { this.state.loginUnsuccessful && <span style={{ color: 'red', fontSize: '18px' }}>{this.state.loginUnsuccessful}</span> }
        <button type="submit"> Log In </button>
      </form>
    );
  }
}

export default Login;

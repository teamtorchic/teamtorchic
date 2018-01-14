import React from 'react';
import $ from 'jquery';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      loginUnsuccessful: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    if (e.target.name === 'username') {
      this.setState({
        username: e.target.value,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { handleLogin, changeView } = this.props;
    $.post({
      url: '/signup',
      contentType: 'application/json',
      data: JSON.stringify({ username: this.state.username, password: $('#password').val() }),
      success: (result) => {
        if (result.message !== 'username already exists' && result.message !== 'Missing credentials') {
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Username: </label>
        <input
          name="username"
          type="text"
          placeholder="username"
          value={this.state.username}
          onChange={this.handleInputChange} />
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
        <button type="submit"> Submit </button>
      </form>
    );
  }
}

export default Signup;

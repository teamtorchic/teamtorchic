import React from 'react';
import $ from 'jquery';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'username',
      password: 'password',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    if (e.target.name === 'username') {
      this.setState({
        username: this.state.username,
      });
    }
    if (e.target.name === 'password') {
      this.setState({
        password: this.target.value,
      });
    }
  }

  handleSubmit() {
    const postData = JSON.stringify(this.state);
    $.post({
      url: '/login',
      data: postData,
      contentType: 'application/json',
    }).done(data => console.log('success', data));
  }

  render() {
    return (
      <form>
        <label>
          Username:
          <input
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange} />
        </label>
        <br />

        <label>
          Password:
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <button type="submit" onClick={this.handleSubmit}> Sign Up</button>
      </form>
    );
  }
}

export default Signup;

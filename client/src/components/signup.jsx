import React from 'react';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'please enter your username',
      password: 'please enter your password',
    };
  }
  render() {
    return (
     <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
  );
  }
}

export default Signup;

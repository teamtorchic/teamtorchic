import React from 'react';
import Login from './login';
import Signup from './signup';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'none',
    };
    this.changeLoginView = this.changeLoginView.bind(this);
    this.changeSignupView = this.changeSignupView.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  changeView() {
    this.setState({
      view: 'none',
    });
  }
  changeLoginView() {
    this.setState({
      view: 'login',
    });
  }

  changeSignupView() {
    this.setState({
      view: 'signup',
    });
  }

  render() {
    const { handleLogin, user } = this.props;
    return (
      <div>{ user && <span>Welcome, {user}!   </span> }<span>eatChic</span>
        { !user && <a href="/auth/google"> Log In Through Google </a> }
        { !user && <button onClick={this.changeLoginView}>Log In</button> }
        { !user && <button onClick={this.changeSignupView}>Sign Up</button> }
        <hr />

        { this.state.view === 'login' && <Login user={user} handleLogin={handleLogin} changeView={this.changeView} /> }
        { this.state.view === 'signup' && <Signup user={user} handleLogin={handleLogin} changeView={this.changeView} /> }
      </div>
    );
  }
}

export default Header;

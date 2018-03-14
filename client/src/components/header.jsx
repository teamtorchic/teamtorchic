import React from 'react';
import Login from './login';
import Signup from './signup';
import Search from './search';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      view: 'none',
    };
    this.changeLoginView = this.changeLoginView.bind(this);
    this.changeSignupView = this.changeSignupView.bind(this);
    this.changeView = this.changeView.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      this.setState({
        user: nextProps.user,
      });
    }
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
    const { handleLogin, handleSearch } = this.props;
    const { user } = this.state;
    return (
      <nav id="header" className="nav justify-content-between">
        <div className="searchBar nav-item">
          {user && <Search handleSearch={handleSearch} />}
        </div>
        { !user && <a href="/auth/google"> Log In Through Google </a> }
        { !user && <button onClick={this.changeLoginView}>Log In</button> }
        { !user && <button onClick={this.changeSignupView}>Sign Up</button> }
        { this.state.view === 'login' && <Login /> }
        { this.state.view === 'signup' && <Signup /> }
        { user && (
        <div className="dropdown">
          <div id="welcome" className="nav-item">Welcome, {user} to eatChic ▾</div>
          <button className="logout" onClick={this.props.handleLogout}> Logout</button>
        </div>)}
      </nav>
    );
  }
}

export default Header;

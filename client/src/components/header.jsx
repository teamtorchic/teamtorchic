import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import Login from './login';
import Signup from './signup';

const Header = () => (
  <Router>
    <div id="header">eatChic
      <a href="/auth/google"> Log In </a>
      {/* <span><Link to="/login">Log In</Link></span> */}
      <span><Link to="/signup">Sign Up</Link></span>
      <hr />

      {/* <Route path="/login" component={Login} /> */}
      <Route path="/signup" component={Signup} />
    </div>
  </Router>
);

export default Header;

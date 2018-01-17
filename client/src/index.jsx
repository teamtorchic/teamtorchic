import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: null,
//     };
//     this.handleLogin = this.handleLogin.bind(this);
//     this.handleLogout = this.handleLogout.bind(this);
//   }

//   handleLogin(user) {
//     this.setState({ user });
//   }

//   handleLogout() {
//     this.setState({
//       user: null,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <div id="header">
//           <Header
//             user={this.state.user}
//             handleLogin={this.handleLogin}
//           />
//           { this.state.user && <button onClick={this.handleLogout}> Logout</button> }
//         </div>
//         {this.state.user && <Submit user={this.state.user} />}
//         <Posts
//           userInfo={this.state.user}
//         />
//       </div>
//     );
//   }
// }

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/login">Log In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </ul>
      <hr />

      <Route exact path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </div>
  </Router>
);
ReactDOM.render(<App />, document.getElementById('app'));

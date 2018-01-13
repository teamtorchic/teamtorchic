import React from 'react';
// import $ from 'jquery';

const Signup = () => (
  <form action="/signup" method="POST">
    <label> Username: </label>
    <input name="username" type="text" placeholder="username" />
    <br />
    <label> Password: </label>
    <input name="password" type="password" placeholder="password" />
    <br />
    <button type="submit"> Sign Up </button>
  </form>
);

// class Signup extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       username: '',
//       password: '',
//     };

//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleInputChange(e) {
//     if (e.target.name === 'username') {
//       this.setState({
//         username: e.target.value,
//       });
//     }
//     if (e.target.name === 'password') {
//       this.setState({
//         password: e.target.value,
//       });
//     }
//   }

//   handleSubmit(e) {
//     const postData = JSON.stringify(this.state);
//     e.preventDefault();
//     $.post({
//       url: '/signup',
//       data: postData,
//       contentType: 'application/json',
//     }).done(data => console.log('success', data));
//   }

//   render() {
//     return (
//       <form>
//         <label> Username: </label>
//         <input
//           name="username"
//           type="text"
//           placeholder="username"
//           value={this.state.username}
//           onChange={this.handleInputChange} />
//         <br />

//         <label> Password: </label>
//         <input
//           name="password"
//           type="password"
//           placeholder="password"
//           value={this.state.password}
//           onChange={this.handleInputChange} />
//         <br />
//         <button type="submit" onClick={this.handleSubmit}> Sign Up</button>
//       </form>
//     );
//   }
// }

export default Signup;

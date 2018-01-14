import React from 'react';

const Login = () => (
  <form action="/login" method="POST">
    <label> Username: </label>
    <input name="username" type="text" placeholder="username" />
    <br />
    <label> Password: </label>
    <input name="password" type="password" placeholder="password" />
    <br />
    <button type="submit"> Log In </button>
  </form>
);

export default Login;

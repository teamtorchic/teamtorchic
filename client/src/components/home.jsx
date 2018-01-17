import React from 'react'
import Blubird from 'bluebird';
import $ from 'jquery';
import Posts from '../components/posts';
import Header from '../components/header';
import Profile from '../components/profile';
import Submit from '../components/submit';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      user: '',
    };
  }

  componentDidMount() {
    $.get({
      url: '/session',
      success: (data) => {
        console.log('----=------', data)
        this.setState({
          user: data,
        });
      },
    });
    $.get({
      url: '/Lory' || `/${this.state.user}`,
      contentType: 'application/json',
      success: (data) => {
        console.log("incoming datqa", data);
        console.log('success post request to /home');
        this.setState({
          posts: data,
        });
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  render() {
    console.log (this.state);
    return (
      <div>
        <Header user={this.state.user} />
        <Submit user={this.state.user} />
        <Profile user={this.state.user} />
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default Home;

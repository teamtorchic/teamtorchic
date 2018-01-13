import React from 'react';
import $ from 'jquery';

import Post from './post';
import fakePostsData from './fakePostsData';

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: fakePostsData,
      dishLikes: 'dishLikes',
      voteCountUp: { upvote: 1 },
      voteCountDown: { downvote: 2 },
    };
    this.addVote = this.addVote.bind(this);
    this.subtractVote = this.addVote.bind(this);
    this.dishGetUpVotes = this.dishPostUpVotes.bind(this);
    this.dishGetDownVotes = this.dishPostDownVotes.bind(this);
    this.dishGetPosts = this.dishGetPosts.bind(this);
    this.dishGetLikes = this.dishGetLikes.bind(this);
  }

  addVote() {
    this.setState({
      voteCountUp: this.state.voteCountUp.upvote + 1,
    });
  }

  subtractVote() {
    this.setState({
      voteCountDown: this.state.voteCountDown.downvote - 1,
    });
  }

  dishPostUpVotes() {
    this.d = 'a';
    // $.ajax({
    //   method: 'POST',
    //   url: 'http://localhost:3000/votes/downvote',
    //   dataType: 'json',
    //   success: (data) => { this.setState(this.state.voteCountUp = data.upvote); },
    // });
  }

  dishPostDownVotes() {
    this.c = 'a';
    // $.ajax({
    //   method: 'POST',
    //   url: 'http://localhost:3000/votes/upvote',
    //   dataType: 'json',
    //   success: (data) => { this.setState(this.state.voteCount = data.downvote); },
    // });
  }

  dishGetPosts() {
    this.b = 'a';
    // $.ajax({
    //   method: 'GET',
    //   url: 'http://localhost:3000/post',
    //   dataType: 'json',
    //   success: (data) => { this.setState(this.state = data); },
    // });
  }

  dishGetLikes() {
    this.state.dishLikes = 'a';
    // $.ajax({
    //   method: 'GET',
    //   url: 'http://localhost:3000/post/votes/:dishId',
    //   dataType: 'json',
    //   success: (data) => { this.setState(this.state.dishLikes = data.dishid); },
    // });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        { this.state.posts.post.map(item =>
          (<Post
            postData={item}
            votesPos={this.state.voteCountUp}
            votesNeg={this.state.voteCountDown}
          />))}
      </div>
    );
  }
}

export default Posts;

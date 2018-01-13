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
      upvote: 1,
      downvote: 2,
    };
    this.handleClick = this.handleClick.bind(this);
    this.dishGetUpVotes = this.dishPostUpVotes.bind(this);
    this.dishGetDownVotes = this.dishPostDownVotes.bind(this);
    this.dishGetPosts = this.dishGetPosts.bind(this);
    this.dishGetLikes = this.dishGetLikes.bind(this);
  }

  handleClick(event) {
    if (event === 'like') {
      this.setState({ upvote: this.state.upvote + 1 });
    } else if (event === 'dislike') {
      this.setState({ downvote: this.state.downvote + 1 });
    }
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
    return (
      <div>
        { this.state.posts.post.map(item =>
          (<Post
            key={item.content}
            postData={item}
            votesPos={this.state.upvote}
            votesNeg={this.state.downvote}
            clickyclick={this.handleClick}
          />))}
      </div>
    );
  }
}

export default Posts;

import React from 'react';
import $ from 'jquery';

import Post from './post';
import fakePostsData from './fakePostsData';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: fakePostsData.post,
      posterLikes: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.getData = this.getData.bind(this);
    this.userLikes = this.userLikes.bind(this);
    this.dishPostUpVotes = this.dishPostUpVotes.bind(this);
    this.dishPostDownVotes = this.dishPostDownVotes.bind(this);
    this.dishGetLikes = this.dishGetLikes.bind(this);
  }
  // if the user has clicked the icon, needs to add one and keep it red. If the
  // user has clicked the icon again, need to subtract one and make it black
  getData() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/post',
      dataType: 'json',
      success: (data) => { this.setState(this.state.posts = data); },
    });
  }

  handleClick(event) {
    if (event === 'like') {
      this.setState({ upvote: this.state.upvote + 1 });
    } else if (event === 'dislike') {
      this.setState({ downvote: this.state.downvote + 1 });
    }
  }

  userLikes() {
    if (this.state.dishLikes === 1) {
      this.setState({ posterLikes: this.state.posterLikes = 'likes' });
    } else if (this.state.dishLikes === 0) {
      this.setState({ posterLikes: this.state.posterLikes = 'dislikes' });
    } else {
      this.setState({});
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

  dishGetLikes() {
    // this.state.posts = 'a';
    // $.ajax({
    //   method: 'GET',
    //   url: 'http://localhost:3000/votes/:dishId',
    //   dataType: 'json',
    //   success: (data) => { this.setState(this.state.dishLikes = data.dishid); },
    // });
  }

  render() {
    return (
      <div>
        { this.state.posts.map(item =>
          (<Post
            key={item.content}
            postData={item}
            postId={item.id}
            postImage={item.image}
            postContent={item.content}
            postUserid={item.userid}
            postDishid={item.dishid}
            votesPos={this.state.upvote}
            votesNeg={this.state.downvote}
            clickyclick={this.handleClick}
          />))}
      </div>
    );
  }
}

export default Posts;

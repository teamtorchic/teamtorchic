import React from 'react';
import $ from 'jquery';

import Post from './post';
import fakePostsData from './fakePostsData';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: fakePostsData.post,
    };
    this.handleClick = this.handleClick.bind(this);
    this.getPostsData = this.getPostsData.bind(this);
    this.postUpvote = this.postUpvote.bind(this);
    this.postDownvote = this.postDownvote.bind(this);
    this.getVotes = this.getVotes.bind(this);
  }
  // if the user has clicked the icon, needs to add one and keep it red. If the
  // user has clicked the icon again, need to subtract one and make it black
  componentDidMount() {
    this.getPostsData();
  }

  getPostsData() {
    $.ajax({
      method: 'GET',
      url: '/post',
      dataType: 'json',
      success: (data) => { this.setState(this.state.posts = data); },
    });
  }

  postUpvote(info) {
    // $.ajax({
    //   method: 'POST',
    //   dataType: 'json',
    //   data: {
    //     'dishid': info.dishid,
    //   },
    //   url: '/votes/upvote',
    //   success: (data) => { console.log('upvote success: ', data); },
    //   error: () => { console.log('upvote err: ', data); },
    // });
  }

  postDownvote(info) {
    // $.ajax({
    //   method: 'POST',
    //   dataType: 'json',
    //   url: '/votes/downvote',
    //   success: (data) => { console.log('downvote success: ', data); },
    //   error: () => { console.log('downvote err: ', data); },
    // });
  }

  getVotes(info) {

  }
  //  need to refactor
  handleClick(event) {
    if (event === 'like') {
      this.postUpvote();
    } else if (event === 'dislike') {
      this.postDownvote();
    }
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
            postUserid={item.username}
            postDishid={item.dishname}
            votesPos={item.votes.upvote}
            votesNeg={item.votes.downvote}
            clickyclick={this.handleClick}
            likeylike={item.likesdish}
          />))}
      </div>
    );
  }
}

export default Posts;

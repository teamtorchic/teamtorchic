import React from 'react';
import $ from 'jquery';

import Post from './post';
import fakePostsData from './fakePostsData';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: fakePostsData.post,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'access-control-allow-headers': 'content-type, accept',
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.getPostsData = this.getPostsData.bind(this);
    this.postUpvote = this.postUpvote.bind(this);
    this.postDownvote = this.postDownvote.bind(this);
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
    $.ajax({
      method: 'POST',
      dataType: 'json',
      headers: this.state.headers,
      url: '/votes/upvote',
      data: {
        'dishId': info.postData.dishid,
        'likesDish': 1,
        'userId': info.postData.userid,
        'restaurantId': info.postData.restaurantid,
      },
      success: () => {
        this.getPostsData();
        console.log('upvote success: ');
      },
      error: () => { },
    });
  }

  postDownvote(info) {
    $.ajax({
      method: 'POST',
      dataType: 'json',
      url: '/votes/downvote',
      headers: this.state.headers,
      data: {
        'dishId': info.postData.dishid,
        'likesDish': 0,
        'userId': info.postData.userid,
        'restaurantId': info.postData.restaurantid,
      },
      success: () => {
        this.getPostsData();
        // console.log('downvote success: ');
      },
      error: () => { },
    });
  }

  handleClick(event, likes) {
    if (likes === 'like') {
      // console.log('event: ', event, 'likes: ', likes);
      this.postUpvote(event);
    } else if (likes === 'dislike') {
      // console.log('event: ', event, 'likes: ', likes);
      this.postDownvote(event);
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
            postDish={item.dishname}
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

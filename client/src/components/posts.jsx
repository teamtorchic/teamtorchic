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

  getVotes(info) {
  }

  postUpvote(info) {
    $.ajax({
      method: 'POST',
      dataType: 'json',
      url: '/votes/upvote',
      data: {
        dishid: info.postData.dishid,
        likesdish: 1,
        userId: info.postData.userid,
        restaurantId: info.postData.restaurantid,
      },
      success: () => {
        console.log('upvote success: ', info);
      },
      error: () => { console.log('upvote err: ', info); },
    });
  }

  postDownvote(info) {
    $.ajax({
      method: 'POST',
      dataType: 'json',
      url: '/votes/downvote',
      data: {
        dishid: info.postData.dishid,
        likesdish: 0,
        userId: info.postData.userid,
        restaurantId: info.postData.restaurantid,
      },
      success: () => { console.log('downvote success: ', info); },
      error: () => { console.log('downvote err:', info); },
    });
  }

  handleClick(event, likes) {
    if (likes === 'like') {
      console.log('event: ', event, 'likes: ', likes);
      this.postUpvote(event);
    } else if (likes === 'dislike') {
      console.log('event: ', event, 'likes: ', likes);
      this.postDownvote(event);
    }
  }


  render() {
    return (
      <div>
        { this.state.posts.map(item =>
          (<Post
            postId={item.id}
            key={item.id}
            postData={item}
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

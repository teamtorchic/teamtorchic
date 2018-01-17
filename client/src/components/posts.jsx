import React from 'react';
import $ from 'jquery';

import Post from './post';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      posts: props.posts,
      id: props.id,
      voted:false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.postUpvote = this.postUpvote.bind(this);
    this.postDownvote = this.postDownvote.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts) {
      this.setState({
        posts: nextProps.posts,
      });
    }
  }

  postUpvote(query) {
    $.post({
      contentType: 'application/json',
      url: '/votes/upvote',
      data: JSON.stringify(query),
      success: () => {
        this.setState({
          voted: !this.state.voted,
        });
      },
      error: () => { console.log('LORY IS MY BEST FRIEND'); },
    });
  }

  postDownvote(query) {
    $.post({
      contentType: 'application/json',
      url: '/votes/upvote',
      data: JSON.stringify(query),
      success: () => {
        this.setState({
          voted: !this.state.voted,
        });
      },
      error: () => { console.log('LORY IS MY BEST FRIEND'); },
    });
  }

  handleClick(query, vote) {
    if (vote) {
      console.log('origin query in upvote', query);
      query.likesdish = 1;
      query.userid = this.props.id;
      console.log ("query after change for upvote", query);
      this.postUpvote(query);
    } else {
      console.log('origin query in downvote', query);
      query.likesdish = 0;
      query.userid = this.props.id;
      console.log ("query after change for downvote", query);
      this.postDownvote(query);
    }
  }


  render() {
    console.log('user: ', this.props.posts);
    return (
      <div>
        { this.state.posts.map(post =>
          (<Post key={post.id} user={this.state.user} post={post} handleClick={this.handleClick} />))}
      </div>
    );
  }
}

export default Posts;

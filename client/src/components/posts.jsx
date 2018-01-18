import React from 'react';
import $ from 'jquery';

import Post from './post';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      posts: this.props.posts,
      id: this.props.id,
    };

    this.handleClick = this.handleClick.bind(this);
    this.postUpvote = this.postUpvote.bind(this);
    this.postDownvote = this.postDownvote.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts) {
      this.setState({
        posts: nextProps.posts,
        user: nextProps.user,
        id: nextProps.id,
      });
    }
  }

  postUpvote(query) {
    $.post({
      contentType: 'application/json',
      url: '/votes/upvote',
      data: JSON.stringify(query),
      success: () => {
        this.props.changeView();
      },
      error: () => { console.log('LORY IS MY BEST FRIEND'); },
    });
  }

  postDownvote(query) {
    console.log (this.props)
    $.post({
      contentType: 'application/json',
      url: '/votes/downvote',
      data: JSON.stringify(query),
      success: () => {
        this.props.changeView();
      },
      error: () => { console.log('LORY IS MY BEST FRIEND'); },
    });
  }

  handleClick(query, vote) {
    if (vote) {
      console.log('origin query in upvote', query);
      query.likesdish = 1;
      query.userid = this.state.id;
      console.log ("query after change for upvote", query);
      this.postUpvote(query);
    } else {
      console.log('origin query in downvote', query);
      query.likesdish = 0;
      query.userid = this.state.id;
      console.log ("query after change for downvote", query);
      this.postDownvote(query);
    }
  }


  render() {
    console.log('user: ', this.props.user);
    console.log (this.state);
    return (
      <div>
        { this.state.posts.map(post =>
          (<Post key={post.id} user={this.state.user} post={post} handleClick={this.handleClick} />))}
      </div>
    );
  }
}

export default Posts;

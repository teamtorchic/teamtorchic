import React from 'react';
import $ from 'jquery';

import Post from './post';
import fakePostsData from './fakePostsData';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: fakePostsData.post,
      userLikes: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.getPostsData = this.getPostsData.bind(this);
    this.voteChange = this.voteChange.bind(this);
    this.populateVerb = this.populateVerb.bind(this);
  }
  // if the user has clicked the icon, needs to add one and keep it red. If the
  // user has clicked the icon again, need to subtract one and make it black
  componentDidMount() {
    this.getPostsData();
    this.populateVerb();
  }

  getPostsData() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/post',
      dataType: 'json',
      success: (data) => { this.setState(this.state.posts = data); },
    });
  }

  //  need to refactor
  handleClick(event) {
    if (event === 'like') {
      this.setState({ upvote: this.state.upvote + 1 });
    } else if (event === 'dislike') {
      this.setState({ downvote: this.state.downvote + 1 });
    }
  }

  //  need to refactor
  voteChange() {
    if (this.state.dishLikes === 1) {
      this.setState({ posterLikes: this.state.posterLikes = 'likes' });
    } else if (this.state.dishLikes === 0) {
      this.setState({ posterLikes: this.state.posterLikes = 'dislikes' });
    } else {
      this.setState({});
    }
  }

  populateVerb(verb) {
    if (verb.likesDish === 1) {
      this.setState({ userLikes: this.state.userLikes = 'likes' });
    } else if (verb.likesDish === 0) {
      this.setState({ userLikes: this.state.userLikes = 'dislikes' });
    }
  //  have this in the post component - pass the populated thing as a prop
  //  and have it show up in the posts
  //  pass this func in as a prop
  //  this will check the dishlike of each item and spit out the correct title
  }

  render() {
    {console.log('this', this.state.posts)}
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
            votesPos={item.votes.upvote}
            votesNeg={item.votes.downvote}
            clickyclick={this.handleClick}
            verbFunc={this.populateVerb}
            verb={this.state.userLikes}
          />))}
      </div>
    );
  }
}

export default Posts;

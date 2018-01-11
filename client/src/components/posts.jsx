import React from 'react';
import Post from './post';
import fakePostsData from './fakePostsData';


class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = fakePostsData;
  }

  render() {
    return (
      <div>
        {this.state.post.map((item) =>
          <Post fakeData={item} />
        )}
      </div>
    );
  }
}

export default Posts;

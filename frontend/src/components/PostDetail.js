import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import Comments from './Comments';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Button } from 'react-bootstrap';

class PostDetail extends Component {

  render() {
    const { post } = this.props;
    if (!isEmpty(post)) {
      return (
        <div>
          <div><Link to="/"><Button>Back</Button></Link></div>
          <Post post={post}/>
          <Comments post={post.id}/>
        </div>
      );
    } else {
      return (<div>Post Not Found</div>);
    }
  }

};

function mapStateToProps(state, ownProps) {
  let post;
  if (!isEmpty(state.posts)) {
    post = state.posts.filter(post => {
      return post.id === ownProps.match.params.post;
    });
    post = post[0];
  }
  return { post };
}

export default connect(
  mapStateToProps
)(PostDetail);

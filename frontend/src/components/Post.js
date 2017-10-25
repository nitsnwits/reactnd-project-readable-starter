import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Panel,
  Label,
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
  Glyphicon
} from 'react-bootstrap';
import { upvote, downvote, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class Post extends Component {

  render() {
    const post = this.props.post;
    const { handleUpvote, handleDownvote, handleDelete } = this.props;
    return (
      <div>
        <Panel header={<Link to={`/posts/${post.id}`}>{post.title}</Link>} footer={`posted by ${post.author}`}>
          {post.body}
          <ListGroup fill>
            <ListGroupItem>
              <Label bsStyle="primary">{(new Date(post.timestamp)).toString()}</Label>&nbsp;
              <Label bsStyle="success">category: {post.category}</Label>&nbsp;
              <Badge>comments: {post.commentCount}</Badge>&nbsp;
              <Badge>votes: {post.voteScore}</Badge>&nbsp;
              <Button onClick={handleUpvote.bind(this, post.id)}><Glyphicon glyph="thumbs-up"/></Button>&nbsp;
              <Button onClick={handleDownvote.bind(this, post.id)}><Glyphicon glyph="thumbs-down"/></Button>&nbsp;
              <Button bsStyle="danger" onClick={handleDelete.bind(this, post.id)}>Delete Post</Button>&nbsp;
              <Link to={`/posts/${post.id}/edit`}><Button bsStyle="warning">Edit Post</Button></Link>&nbsp;
            </ListGroupItem>
          </ListGroup>
        </Panel>
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return {
    handleUpvote: postId => dispatch(upvote(postId)),
    handleDownvote: postId => dispatch(downvote(postId)),
    handleDelete: postId => dispatch(deletePost(postId))
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

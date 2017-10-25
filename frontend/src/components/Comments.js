import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Panel
} from 'react-bootstrap';
import { upvote, downvote, deletePost } from '../actions';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { fetchAllComments, addComment } from '../actions';
import uuid from 'uuid/v4';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      body: '',
      author: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let comment, author;
    switch (event.target.id)  {
      case 'comment':
        comment = event.target.value;
        this.setState({ body: comment });
        break;
      case 'author':
        author = event.target.value;
        this.setState({ author });
        break;
      default:
        return;
    }
    return;
  }

  handleSubmit(event) {
    event.preventDefault();
    const newComment = Object.assign({}, this.state, {
      id: uuid(),
      timestamp: Date.now(),
      parentId: this.props.post
    });
    this.setState({
      body: '',
      author: ''
    });
    this.props.addComment(newComment);
  }
  
  componentWillMount() {
    this.props.getComments(this.props.post);
  }

  render() {
    const { comments } = this.props;
    if (!isEmpty(comments)) {
      return (
        <div>
          {comments.map(comment => (
            <div key={comment.id}>
              <Panel footer={`posted by ${comment.author}`}>
                {comment.body}
              </Panel>
            </div>
          ))}
          <div>
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <FieldGroup
                id="comment"
                type="comment"
                placeholder="Add your comment here"
                value={this.state.body}
              />
              <FieldGroup
                id="author"
                type="author"
                placeholder="Your name"
                value={this.state.author}
              />
              <Button type="submit">
                Submit
              </Button>
              <Link to={`/`}>
                <Button>
                  Cancel
                </Button>
              </Link>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <FieldGroup
            id="comment"
            type="comment"
            placeholder="Add your comment here"
            value={this.state.body}
          />
          <FieldGroup
            id="author"
            type="author"
            placeholder="Your name"
            value={this.state.author}
          />
          <Button type="submit">
            Submit
          </Button>
          <Link to={`/`}>
            <Button>
              Cancel
            </Button>
          </Link>
        </form>
      </div>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  let comments = [];
  console.log('got new state %j', state.posts);
  if (!isEmpty(state.posts)) {
    const post = state.posts.filter(post => {
      return post.id === ownProps.post;
    });
    if (post.length > 0) {
      comments = post[0].comments;
    }
  }
  let numOfComments = 0;
  if (comments) numOfComments = comments.length;
  return { comments, numOfComments };
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: postId => dispatch(fetchAllComments(postId)),
    addComment: comment => dispatch(addComment(comment))
    // handleUpvote: postId => dispatch(upvote(postId)),
    // handleDownvote: postId => dispatch(downvote(postId)),
    // handleDelete: postId => dispatch(deletePost(postId))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);

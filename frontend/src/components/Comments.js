import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Panel,
  Glyphicon,
  ListGroup,
  ListGroupItem,
  Badge
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { fetchAllComments, addComment, upvoteComment, downvoteComment, deleteComment } from '../actions';
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
    const { comments, handleUpvote, handleDownvote, handleDelete } = this.props;
    if (!isEmpty(comments)) {
      return (
        <div>
          {comments.map(comment => (
            <div key={comment.id}>
              <Panel footer={`posted by ${comment.author}`}>
                {comment.body}
                <ListGroup fill>
                  <ListGroupItem>
                    <Badge>votes: {comment.voteScore}</Badge>&nbsp;
                    <Button onClick={handleUpvote.bind(this, comment.id)}><Glyphicon glyph="thumbs-up"/></Button>&nbsp;
                    <Button onClick={handleDownvote.bind(this, comment.id)}><Glyphicon glyph="thumbs-down"/></Button>&nbsp;
                    <Button bsStyle="danger" onClick={handleDelete.bind(this, comment.id)}>Delete Comment</Button>&nbsp;
                  </ListGroupItem>
                </ListGroup>
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
  console.log('new state ', state)
  let comments = [];
  if (!isEmpty(state.posts)) {
    const post = state.posts.filter(post => {
      return post.id === ownProps.post;
    });
    if (post.length > 0) {
      comments = post[0].comments;
    }
  }
  let numOfComments = 0;
  let sumVotes = 0;
  if (comments) numOfComments = comments.length;
  if (comments) comments.forEach(comment => {sumVotes += comment.voteScore});
  return { comments, numOfComments, sumVotes };
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: postId => dispatch(fetchAllComments(postId)),
    addComment: comment => dispatch(addComment(comment)),
    handleUpvote: commentId => dispatch(upvoteComment(commentId)),
    handleDownvote: commentId => dispatch(downvoteComment(commentId)),
    handleDelete: commentId => dispatch(deleteComment(commentId))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);

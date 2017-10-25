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
import { fetchAllComments } from '../actions';

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
      title: '',
      body: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let title, body;
    switch (event.target.id)  {
      case 'title':
        title = event.target.value;
        break;
      case 'content':
        body = event.target.value;
        break;
      default:
        return;
    }
    title && this.setState({ title });
    body && this.setState({ body });
  }

  handleSubmit(event) {
    event.preventDefault();
    //this.props.handleEdit(id, this.state.title, this.state.body);
    //this.props.history.push(`/${category}`);
    return;
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
          <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <FieldGroup
              id="comment"
              type="comment"
              label="Add comment"
              placeholder="Add your comment here"
            />
            <Button type="submit">
              Submit
            </Button>
            <Button href="/">
              Cancel
            </Button>
          </form>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
}

function mapStateToProps(state, ownProps) {
  let comments = [];
  if (!isEmpty(state.posts)) {
    const post = state.posts.filter(post => {
      return post.id === ownProps.post;
    });
    if (post.length > 0) {
      comments = post[0].comments;
    }
  }
  return { comments };
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: postId => dispatch(fetchAllComments(postId))
    // handleUpvote: postId => dispatch(upvote(postId)),
    // handleDownvote: postId => dispatch(downvote(postId)),
    // handleDelete: postId => dispatch(deletePost(postId))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);

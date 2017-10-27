import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button
} from 'react-bootstrap';
import { editComment } from '../actions';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class CommentEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      body: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let body;
    switch (event.target.id)  {
      case 'content':
        body = event.target.value;
        break;
      default:
        return;
    }
    body && this.setState({ body });
  }

  handleSubmit(id, event) {
    event.preventDefault();
    this.props.handleEdit(id, this.state.body);
    this.props.history.push(`/posts/${this.props.comment.parentId}`);
    return;
  }

  render() {
    const { comment } = this.props;
    if (!isEmpty(comment)) {
      return (
        <div>
          <div><Link to={`/posts/${comment.parentId}`}><Button>Back</Button></Link></div>
          <form onChange={this.handleChange} onSubmit={this.handleSubmit.bind(this, comment.id)}>
            <FieldGroup
              id="content"
              type="content"
              label="Content"
              defaultValue={comment.body}
            />

            <Button type="submit">
              Submit
            </Button>
            <Link to={`/posts/${comment.parentId}`}>
              <Button>
                Cancel
              </Button>
            </Link>
          </form>
        </div>
      );
    } else {
      return (<div>Comment Not Found</div>);
    }
  }
}

function mapStateToProps(state, ownProps) {
  let commentToEdit;
  if (!isEmpty(state.posts)) {
    state.posts.forEach(post => {
      if (post.comments && post.comments.length > 0) {
        post.comments.forEach(comment => {
          if (comment.id === ownProps.match.params.comment) {
            commentToEdit = comment;
          }
        });
      }
    });
  }
  return { comment: commentToEdit };
}

function mapDispatchToProps(dispatch) {
  return {
    handleEdit: (commentId, body) => dispatch(editComment(commentId, body))
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentEdit);

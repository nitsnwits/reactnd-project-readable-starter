import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button
} from 'react-bootstrap';
import { editPost } from '../actions';
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

class PostEdit extends Component {

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

  handleSubmit(id, event) {
    event.preventDefault();
    this.props.handleEdit(id, this.state.title, this.state.body);
    this.props.history.push(`/posts/${id}`);
    return;
  }

  render() {
    const { post } = this.props;
    if (!isEmpty(post)) {
      return (
        <div>
          <div><Link to="/"><Button>Back</Button></Link></div>
          <form onChange={this.handleChange} onSubmit={this.handleSubmit.bind(this, post.id)}>
            <FieldGroup
              id="title"
              type="title"
              label="Title"
              defaultValue={post.title}
            />
            <FieldGroup
              id="content"
              type="content"
              label="Content"
              defaultValue={post.body}
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
      return (<div>Post Not Found</div>);
    }
  }
}

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

function mapDispatchToProps(dispatch) {
  return {
    handleEdit: (postId, title, body) => dispatch(editPost(postId, title, body))
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostEdit);

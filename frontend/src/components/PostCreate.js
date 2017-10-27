import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';
import { createPost, fetchAllCategories } from '../actions';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import { isEmpty } from 'lodash';
import { capitalize } from '../utils/helpers';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class PostCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
      title: '',
      body: '',
      author: '',
      category: 'Category',
      timestamp: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }


  componentWillMount() {
    this.props.getList();
  }

  handleChange(event) {
    this.setState({ timestamp: Date.now() });
    switch (event.target.id) {
      case 'title':
        this.setState({ title: event.target.value });
        break;
      case 'body':
        this.setState({ body: event.target.value });
        break;
      case 'author':
        this.setState({ author: event.target.value });
        break;
      default:
        return;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleCreate(this.state);
    this.props.history.push(`/`);
    return;
  }

  handleSelect(event) {
    this.setState({
      category: event
    });
  }

  render() {
    const { categories } = this.props;
    if (!isEmpty(categories)) {
      return (
        <div>
          <div><Link to={`/`}><Button>Back</Button></Link></div>
          <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <FieldGroup
              id="title"
              type="title"
              label="Title"
              placeholder="Enter title here"
            />
            <FieldGroup
              id="body"
              type="body"
              label="Content"
              placeholder="Enter content here"
            />
            <FieldGroup
              id="author"
              type="author"
              label="Author"
              placeholder="Enter your name here"
            />
  
            <DropdownButton bsStyle="default" title={capitalize(this.state.category)} key="category" id="category" label="Choose category" onSelect={this.handleSelect}>
              {
                categories.categories.map(category => (
                  <MenuItem key={category.name} eventKey={category.name}>{capitalize(category.name)}</MenuItem>
                ))
              }
            </DropdownButton>
  
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
    } else {
      return (<div></div>);
    }
  }
}

function mapStateToProps({ categories}) {
  return { categories };
}

function mapDispatchToProps(dispatch) {
  return {
    handleCreate: post => dispatch(createPost(post)),
    getList: () => dispatch(fetchAllCategories()),
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCreate);

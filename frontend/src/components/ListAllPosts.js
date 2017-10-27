import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllPosts, sortPostsBy } from '../actions';
import ListPosts from './ListPosts';
import { DropdownButton, MenuItem, Button } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';


class ListAllPosts extends Component {

  state = {
    sortBy: 'Votes'
  }

  componentWillMount() {
    this.props.getList();
  }

  handleSelect(event) {
    this.props.sort(event);
    this.setState({
      sortBy: event === 'timestamp' ? 'TIme' : 'Votes'
    });
  }

  render() {
    let { posts, sortPostsBy } = this.props;
    if (!sortPostsBy) sortPostsBy = 'voteScore';
    if (!isEmpty(posts)) {
      return (
        <div>
          <div className="form-inline text-right">
          <Link to={`/new/post`}><Button bsStyle="default">Create Post</Button></Link>
          <DropdownButton bsStyle="default" title={`Sort by ${this.state.sortBy}`} key={sortPostsBy} id="sort" onSelect={this.handleSelect.bind(this)}>
            <MenuItem eventKey="timestamp" >Time</MenuItem>
            <MenuItem eventKey="voteScore">Votes</MenuItem>
          </DropdownButton>
          </div>
          <ListPosts posts={posts}/>
        </div>
      )
    } else {
      return (
        <div>
          No posts available
        </div>
      )
    }
  }

};


function mapStateToProps({ posts, sortPostsBy }) {
  return { posts, sortPostsBy };
}

function mapDispatchToProps(dispatch) {
  return {
    getList: () => dispatch(fetchAllPosts()),
    sort: (event) => dispatch(sortPostsBy(event))
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListAllPosts);

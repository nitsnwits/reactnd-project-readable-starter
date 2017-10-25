import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListPosts from './ListPosts';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import { fetchAllPosts, sortPostsBy } from '../actions';
import { DropdownButton, MenuItem } from 'react-bootstrap';


class ListPostsByCategory extends Component {

  state = {
    sortBy: 'Votes'
  }  

  handleSelect(event) {
    this.props.sort(event);
    this.setState({
      sortBy: event === 'timestamp' ? 'TIme' : 'Votes'
    });
  }

  componentWillMount() {
    this.props.getList();
  }

  render() {
    const { posts } = this.props;
    const categoryId = this.props.match.params.category;
    let filteredPosts = posts;
    if (!isEmpty(posts)) {
      filteredPosts = this.props.posts.filter(post => {
        return post.category === categoryId;
      });
    }
    if (!isEmpty(filteredPosts)) {
      return (
        <div>
          <div><Link to="/"><Button>Back</Button></Link></div>
          <div className="form-inline text-right">
          <DropdownButton bsStyle="default" title={`Sort by ${this.state.sortBy}`} key={sortPostsBy} id="sort" onSelect={this.handleSelect.bind(this)}>
            <MenuItem eventKey="timestamp" >Time</MenuItem>
            <MenuItem eventKey="voteScore">Votes</MenuItem>
          </DropdownButton>
          </div>
          <ListPosts posts={filteredPosts}/>
        </div>
      )
    } else {
      return (
        <div>
          <div><Link to="/"><Button>Back</Button></Link></div>
          No posts available
        </div>
      )
    }
  }

};

function mapStateToProps({ posts }) {
  return { posts };
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
)(ListPostsByCategory);

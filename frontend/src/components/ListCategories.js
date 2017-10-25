import React, { Component } from 'react';
import { Panel, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchAllCategories, fetchPostsByCategoryId } from '../actions';
import { capitalize } from '../utils/helpers';
import { Link } from 'react-router-dom';


class ListCategories extends Component {

  componentWillMount() {
    this.props.getList();
  }

  render() {
    const { categories, getPosts } = this.props;
    if (categories) {
      return (
        <div>
          <Panel collapsible defaultExpanded header="Categories">
            {
              categories.map(category => (
                <div key={category.name} >
                  <ListGroupItem>
                    <Link to={`/${category.path}`} onClick={() => getPosts(category.path)}>
                      {capitalize(category.name)}
                    </Link>
                  </ListGroupItem>
                </div>
              ))
            }
          </Panel>
        </div>
      )
    } else {
      return <div>fetching data..</div>
    }
  }

};

function mapStateToProps({ categories }) {
  return categories;
}

function mapDispatchToProps(dispatch) {
  return {
    getList: () => dispatch(fetchAllCategories()),
    getPosts: () => dispatch(fetchPostsByCategoryId)
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCategories);

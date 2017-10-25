import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ListAllPosts from './ListAllPosts';
import ListCategories from './ListCategories';
import { connect } from 'react-redux';

class Home extends Component {

  render() {
    return (
      <div className="home">
        <Row>
          <Col md={2}>
            <div className="app-categories">
              <ListCategories/>
            </div>
          </Col>
          <Col md={7}>
            <div className="app-posts">
              <ListAllPosts/>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return { categories, posts };
}

export default connect(mapStateToProps)(Home);

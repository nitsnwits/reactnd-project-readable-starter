import React from 'react';
import { Navbar } from 'react-bootstrap';

export default function ListCategories({ list }) {
  return (
    <div className="app-navbar">
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Readable</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Text>Project for Udacity React Nanodegree</Navbar.Text>
      </Navbar>
    </div>
  )
}
import React from 'react';
import { Panel } from 'react-bootstrap';
import Post from './Post';

export default function ListPosts({ posts }) {
  return (
    <div>
      <Panel collapsible defaultExpanded header="Posts">
        {
          posts.map(post => (
            <div key={post.id}>
              <Post post={post}/>
            </div>
          ))
        }
      </Panel>
    </div>
  )
}

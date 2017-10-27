const token = 'neeraj/nd019/readable-udacity';
const baseurl = 'http://localhost:3001';

const headers = {
  Accept: 'application/json',
  Authorization: `Basic ${token}`,
  'Content-Type': 'application/json'
};

export const getAllPosts = () => {
  return fetch(`${baseurl}/posts`, { headers })
    .then(res => res.json())
    .catch(err => console.error('api.js error: ', err));
}

export const getPostById = (postId) => {
  return fetch(`${baseurl}/posts/${postId}`, { headers })
    .then(res => res.json())
    .catch(err => console.error('api.js error: ', err));
}

export const getCommentsByPostId = (postId) => {
  return fetch(`${baseurl}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .catch(err => console.error('api.js error: ', err));
}

export const getAllCategories = () => {
  return fetch(`${baseurl}/categories`, { headers })
    .then(res => res.json())
    .catch(err => console.error('api.js error: ', err));
}

export const getAllPostsByCategoryId = (categoryId) => {
  return fetch(`${baseurl}/categories/${categoryId}/posts`, { headers })
    .then(res => res.json())
    .catch(err => console.error('api.js error: ', err));
}

export const upvotePost = (postId) => {
  return fetch(`${baseurl}/posts/${postId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ option: 'upVote' })
    })
    .then(res => res.json())
    .catch(err => console.error('api.js error: ', err));
}

export const upvoteCommentApi = commentId => {
  return fetch(`${baseurl}/comments/${commentId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option: 'upVote'})
  })
  .then(res => res.json())
  .catch(err => console.error('api.js error: ', err));
}

export const downvotePost = (postId) => {
  return fetch(`${baseurl}/posts/${postId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ option: 'downVote' })
    })
    .then(res => res.json())
    .catch(err => console.error('api.js error: ', err));
}

export const downvoteCommentApi = commentId => {
  return fetch(`${baseurl}/comments/${commentId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option: 'downVote'})
  })
  .then(res => res.json())
  .catch(err => console.error('api.js error: ', err));
}

export const deletePostByPostId = (postId) => {
  return fetch(`${baseurl}/posts/${postId}`, {
      method: 'DELETE',
      headers
    })
    .then(res => res.json())
    .catch(err => console.error('api.js error: ', err));
}

export const editPostByPostId = (postId, title, body) => {
  return fetch(`${baseurl}/posts/${postId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        title,
        body
      })
    })
    .then(res => res.json())
    .catch(err => console.error('api.js error: ', err));
}

export const getAllComments = (postId) => {
  return fetch(`${baseurl}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .catch(err => console.error('api.js error: ', err));
}

export const postComment = comment => {
  return fetch(`${baseurl}/comments`, { 
    method: 'POST',
    body: JSON.stringify(comment),
    headers
  })
  .then(res => res.json())
  .catch(err => console.error('api.js error: ', err));
}

export const deleteCommentApi = commentId => {
  return fetch(`${baseurl}/comments/${commentId}`, {
    method: 'DELETE',
    headers
  })
  .then(res => res.json())
  .catch(err => console.error('api.js error: ', err));
}

export const editCommentApi = (commentId, body) => {
  return fetch(`${baseurl}/comments/${commentId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ body })
  })
  .then(res => res.json())
  .catch(err => console.error('api.js error: ', err));
}

export const createPostApi = post => {
  return fetch(`${baseurl}/posts`, {
    method: 'POST',
    headers, 
    body: JSON.stringify(post)
  })
  .then(res => res.json())
  .catch(err => console.error('api.js error: ', err));
}


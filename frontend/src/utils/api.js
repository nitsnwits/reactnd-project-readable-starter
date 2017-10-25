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

export const downvotePost = (postId) => {
  return fetch(`${baseurl}/posts/${postId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ option: 'downVote' })
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



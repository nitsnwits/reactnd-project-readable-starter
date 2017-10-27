import {
  GET_ALL_POSTS,
  SORT_POSTS_BY,
  UPVOTE,
  DOWNVOTE,
  DELETE_POST,
  EDIT_POST,
  GET_ALL_COMMENTS,
  ADD_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT
} from './types';
import {
  getAllPosts,
  upvotePost,
  downvotePost,
  deletePostByPostId,
  editPostByPostId,
  getAllComments,
  postComment,
  upvoteCommentApi,
  downvoteCommentApi
} from '../utils/api';

export const handleAllPosts = response => ({
  type: GET_ALL_POSTS,
  response
});

export const fetchAllPosts = () => {
  return dispatch => {
    return getAllPosts()
      .then(posts => dispatch(handleAllPosts(posts)))
      .catch(err => console.error('action error: ', err));
  }
}

export const sortPostsBy = sortBy => ({
  type: SORT_POSTS_BY,
  sortPostsBy: sortBy
});

export const handleUpvote = response => ({
  type: UPVOTE,
  response
});

export const handleDownvote = response => ({
  type: DOWNVOTE,
  response
});

export const upvote = postId => {
  return dispatch => {
    return upvotePost(postId)
      .then(post => dispatch(handleUpvote(post)))
      .catch(err => console.error('action error: ', err));
  }
}

export const handleUpvoteComment = response => ({
  type: UPVOTE_COMMENT,
  response
});

export const upvoteComment = commentId => {
  return dispatch => {
    return upvoteCommentApi(commentId)
    .then(comment => dispatch(handleUpvoteComment(comment)))
    .catch(err => console.error('action error: ', err));
  }
}

export const downvote = postId => {
  return dispatch => {
    return downvotePost(postId)
      .then(post => dispatch(handleDownvote(post)))
      .catch(err => console.error('action error: ', err));
  }
}

export const handleDownvoteComment = response => ({
  type: DOWNVOTE_COMMENT,
  response
});

export const downvoteComment = commentId => {
  return dispatch => {
    return downvoteCommentApi(commentId)
    .then(comment => dispatch(handleDownvoteComment(comment)))
    .catch(err => console.error('action error: ', err));
  }
}

export const handleDelete = id => ({
  type: DELETE_POST,
  response: id
});

export const handleEdit = response => ({
  type: EDIT_POST,
  response
});

export const deletePost = postId => {
  return dispatch => {
    return deletePostByPostId(postId)
      .then(post => dispatch(handleDelete(postId)))
      .catch(err => console.error('action error: ', err));
  }
}

export const editPost = (postId, title, body) => {
  return dispatch => {
    return editPostByPostId(postId, title, body)
      .then(post => dispatch(handleEdit(post)))
      .catch(err => console.error('action error: ', err));
  }
}

export const handleComments = response => ({
  type: GET_ALL_COMMENTS,
  response
});

export const fetchAllComments = postId => {
  return dispatch => {
    return getAllComments(postId)
      .then(comments => dispatch(handleComments(comments)))
      .catch(err => console.error('action error: ', err));
  }
}

export const handleAddComment = response => ({
  type: ADD_COMMENT,
  response
});

export const addComment = comment => {
  return dispatch => {
    return postComment(comment)
      .then(comment => dispatch(handleAddComment(comment)))
      .catch(err => console.error('action error: ', err));
  }
}

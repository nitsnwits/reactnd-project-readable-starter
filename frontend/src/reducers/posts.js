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
} from '../actions/types';
import { sortBy } from 'lodash';

export default function posts(state = {}, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.response;
    case SORT_POSTS_BY:
      return sortBy(state, action.sortPostsBy).reverse();
    case UPVOTE:
    case DOWNVOTE:
      const updatedState = state.map(post => {
        if (post.id === action.response.id) {
          return action.response;
        }
        return post;
      });
      return updatedState;
    case DELETE_POST:
      const stateWithDeletePost = state.filter(post => {
        if (post.id !== action.response) {
          return post;
        }
      });
      return stateWithDeletePost;
    case GET_ALL_COMMENTS:
      const stateWithComments = state.map(post => {
        if (action.response.length > 0) {
          if (post.id === action.response[0].parentId) {
            post.comments = action.response;
          }
        } 
        return post;
      });
      return stateWithComments;
    case EDIT_POST:
      const stateWithEditedPost = state.map(post => {
        if (post.id === action.response.id) {
          return action.response;
        }
        return post;
      });
      return stateWithEditedPost;
    case ADD_COMMENT:
      const stateWithAddedComment = state.map(post => {
        const comment = action.response;
        if (post.id === action.response.parentId) {
          if (post.comments) {
            post.comments.push(comment);
          } else {
            post.comments = [ comment ];
          }
          post.commentCount += 1;
          return post;
        }
        return post;
      });
      return stateWithAddedComment;
    case UPVOTE_COMMENT:
    case DOWNVOTE_COMMENT:
      const stateWithUpvotedComment = state.map(post => {
        const updatedPost = Object.assign({}, post);
        if (post.comments && post.comments.length > 0) {
          post.comments.forEach((comment, index) => {
            if (comment.id === action.response.id) {
              updatedPost.comments[index] = action.response;
            }
          });
        }
        return updatedPost;
      });
      return stateWithUpvotedComment;
    default:
      return state;
  }
}

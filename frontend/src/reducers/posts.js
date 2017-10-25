import { GET_ALL_POSTS, SORT_POSTS_BY, UPVOTE, DOWNVOTE, DELETE_POST, EDIT_POST, GET_ALL_COMMENTS } from '../actions/types';
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
    default:
      return state;
  }
}

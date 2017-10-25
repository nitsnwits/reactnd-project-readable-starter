import { GET_ALL_CATEGORIES, GET_ALL_POSTS_BY_CATEGORY_ID } from '../actions/types';

export default function categories(state = {}, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.response;
    case GET_ALL_POSTS_BY_CATEGORY_ID:
      return action.response;
    default:
      return state;
  }
}

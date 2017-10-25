import { GET_ALL_CATEGORIES, GET_ALL_POSTS_BY_CATEGORY_ID } from './types';
import { getAllCategories, getAllPostsByCategoryId } from '../utils/api';

export const handleAllCategories = response => ({
  type: GET_ALL_CATEGORIES,
  response
});

export const handleAllPosts = response => ({
  type: GET_ALL_POSTS_BY_CATEGORY_ID,
  response
});

export const fetchAllCategories = () => {
  return dispatch => {
    return getAllCategories()
      .then(categories => dispatch(handleAllCategories(categories)))
      .catch(err => console.error('action error: ', err));
  }
}

export const fetchPostsByCategoryId = categoryId => {
  return dispatch => {
    return getAllPostsByCategoryId(categoryId)
      .then(posts => dispatch(handleAllPosts(posts)))
      .catch(err => console.error('action error: ', err));
  }
}

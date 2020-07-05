import axios from 'axios';
import authHeader from '../authHeader';
import BACKEND from '../backend';
import {
  SELECT_CATEGORY,
  INCREASE_FETCHED_DATA_COUNT,
  INCREASE_SELECTED_INDEX,
  DECREASE_SELECTED_INDEX,
  START_FETCHING_TEACHERS,
  ERROR_FETCHING_TEACHERS,
  SUCCESS_FETCHING_TEACHERS,
} from './teacherTypes';

const selectCategory = category => ({
  type: SELECT_CATEGORY,
  payload: {
    category,
  },
});

const increaseFetchedDataCount = () => ({
  type: INCREASE_FETCHED_DATA_COUNT,
});

const increaseSelectedIndex = () => ({
  type: INCREASE_SELECTED_INDEX,
});

const decreaseSelectedIndex = () => ({
  type: DECREASE_SELECTED_INDEX,
});

const startFetchingTeachers = () => ({
  type: START_FETCHING_TEACHERS,
});

const succesFetchingTeachers = teachers => ({
  type: SUCCESS_FETCHING_TEACHERS,
  payload: {
    teachers,
  },
});

const errorFetchingTeachers = error => ({
  type: ERROR_FETCHING_TEACHERS,
  payload: {
    error,
  },
});

const fetchTeachers = category => dispatch => {
  dispatch(startFetchingTeachers());
  return axios.get(`${BACKEND}/api/v1/categories/${category}/teachers`, { headers: authHeader })
    .then(res => dispatch(succesFetchingTeachers(res.data.teachers)))
    .catch(err => dispatch(errorFetchingTeachers(err)));
};

export {
  selectCategory,
  increaseFetchedDataCount,
  increaseSelectedIndex,
  decreaseSelectedIndex,
  fetchTeachers,
  startFetchingTeachers,
  succesFetchingTeachers,
  errorFetchingTeachers,
};

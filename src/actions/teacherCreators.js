import axios from 'axios';
import BACKEND from '../backend';
import {
  SELECT_CATEGORY,
  INCREASE_FETCHED_DATA_COUNT,
  INCREASE_SELECTED_INDEX,
  DECREASE_SELECTED_INDEX,
  START_FETCHING_TEACHERS,
  ERROR_FETCHING_TEACHERS,
  SUCCESS_FETCHING_TEACHERS,
  START_FETCHING_SELECTED_TEACHER,
  SUCCESS_FETCHING_SELECTED_TEACHER,
  ERROR_FETCHING_SELECTED_TEACHER,
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
  return axios.get(`${BACKEND}/api/v1/categories/${category}/teachers`,
    { headers: { Authorization: `Bearer ${localStorage.getItem('token_auth')}` } })
    .then(res => dispatch(succesFetchingTeachers(res.data.teachers)))
    .catch(err => dispatch(errorFetchingTeachers(err)));
};

const startFetcheingSelectedTeacher = () => ({
  type: START_FETCHING_SELECTED_TEACHER,
});

const errorFetcheingSelectedTeacher = error => ({
  type: ERROR_FETCHING_SELECTED_TEACHER,
  payload: {
    error,
  },
});

const successFetchingSelectedTeacher = (teacher, categories) => ({
  type: SUCCESS_FETCHING_SELECTED_TEACHER,
  payload: {
    teacher,
    categories,
  },
});

const fetchSelectedTeacher = id => dispatch => {
  dispatch(startFetcheingSelectedTeacher());
  axios.get(`${BACKEND}/api/v1/teachers/${id}`)
    .then(res => {
      const { teacher, categories } = res.data;
      dispatch(successFetchingSelectedTeacher(teacher, categories));
    }).catch(err => dispatch(errorFetcheingSelectedTeacher(err)));
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
  fetchSelectedTeacher,
};

import axios from 'axios';
import { setFlash } from './layoutCreators';
import BACKEND from '../backend';
import {
  SET_USER,
  CLEAR_USER,
  SET_SCHEDULE,
  START_FETCH_USER_BY_TOKEN,
  SUCCESS_FETCH_USER_BY_TOKEN,
  ERROR_FETCH_USER_BY_TOKEN,
  START_UPDATE_SCHEDULE,
  ERROR_UPDATE_SCHEDULE,
} from './authTypes';

const setUser = (currentUser, accountType, categories) => ({
  type: SET_USER,
  payload: {
    currentUser,
    accountType,
    categories,
  },
});

const clearUser = () => ({
  type: CLEAR_USER,
});

const setSchedule = schedule => ({
  type: SET_SCHEDULE,
  payload: {
    schedule,
  },
});

const startFetchUserByToken = () => ({
  type: START_FETCH_USER_BY_TOKEN,
});

const successFetchUserByToken = (currentUser, accountType, categories) => ({
  type: SUCCESS_FETCH_USER_BY_TOKEN,
  payload: {
    currentUser,
    accountType,
    categories,
  },
});

const errorFetchUserByToken = error => ({
  type: ERROR_FETCH_USER_BY_TOKEN,
  payload: {
    error,
  },
});

const fetchUserByToken = () => dispatch => {
  dispatch(startFetchUserByToken());
  axios.get(`${BACKEND}/api/v1/login/get_user_by_token`,
    { headers: { Authorization: `Bearer ${localStorage.getItem('token_auth')}` } })
    .then(res => {
      const { current_user: currentUser, account_type: accountType, categories } = res.data;
      dispatch(successFetchUserByToken(currentUser, accountType, categories));
    })
    .catch(error => errorFetchUserByToken(error));
};

const startUpdateSchedule = () => ({
  type: START_UPDATE_SCHEDULE,
});

const errorUpdateSchedule = error => ({
  type: ERROR_UPDATE_SCHEDULE,
  payload: {
    error,
  },
});

const updateSchedule = (currentSchedule, currentUser) => dispatch => {
  dispatch(startUpdateSchedule());
  axios.put(`${BACKEND}/api/v1/teachers/${currentUser.id}/update_schedule`, {
    schedule: currentSchedule,
  }, { headers: { Authorization: `Bearer ${localStorage.getItem('token_auth')}` } }).then(() => {
    dispatch(setSchedule(currentSchedule));
    dispatch(setFlash({ open: true, message: 'schedule updated', severity: 'success' }));
  }).catch(err => {
    dispatch(setFlash({ open: true, message: 'There is an error', severity: 'error' }));
    dispatch(errorUpdateSchedule(err));
  });
};

export {
  clearUser,
  setUser,
  setSchedule,
  fetchUserByToken,
  updateSchedule,
};

import axios from 'axios';
import { setFlash } from './layoutCreators';
import BACKEND from '../backend';
import {
  SET_USER,
  CLEAR_USER,
  SET_SCHEDULE,
  START_FETCH_USER_BY_TOKEN,
  ERROR_FETCH_USER_BY_TOKEN,
  START_UPDATE_SCHEDULE,
  ERROR_UPDATE_SCHEDULE,
  START_UPDATE_PROFIL,
  ERROR_UPDATE_PROFIL,
  START_UPDATE_SESSION_TYPE,
  SUCCESS_UPDATE_SESSION_TYPE,
  ERROR_UPDATE_SESSION_TYPE,
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
      dispatch(setUser(currentUser, accountType, categories));
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

const startUpdateProfil = () => ({
  type: START_UPDATE_PROFIL,
});

const errorUpdateProfil = error => ({
  type: ERROR_UPDATE_PROFIL,
  payload: {
    error,
  },
});

const updateProfil = (data, currentUser, type) => dispatch => {
  dispatch(startUpdateProfil());
  axios.put(`${BACKEND}/api/v1/${type}/${currentUser.id}/update_profil`, {
    ...data,
  }, { headers: { Authorization: `Bearer ${localStorage.getItem('token_auth')}` } })
    .then(res => {
      dispatch(setFlash({ open: true, message: 'Profile updated with success', severity: 'success' }));
      dispatch(setUser(
        res.data.current_user,
        type === 'students' ? 'Student' : 'Teacher',
        [],
      ));
    }).catch(err => {
      dispatch(setFlash({ open: true, message: 'Error, try later', severity: 'error' }));
      dispatch(errorUpdateProfil(err));
    });
};

const startUpdateSessionType = () => ({
  type: START_UPDATE_SESSION_TYPE,
});

const successUpdateSessionType = sessionType => ({
  type: SUCCESS_UPDATE_SESSION_TYPE,
  payload: {
    sessionType,
  },
});

const errorUpdateSessionType = error => ({
  type: ERROR_UPDATE_SESSION_TYPE,
  payload: {
    error,
  },
});

const updateSessionType = (newSessionType, currentUser) => dispatch => {
  dispatch(startUpdateSessionType());
  axios.put(`${BACKEND}/api/v1/teachers/${currentUser.id}/update_session_type`, {
    session_type: newSessionType,
  }, { headers: { Authorization: `Bearer ${localStorage.getItem('token_auth')}` } }).then(() => {
    dispatch(setFlash({ open: true, message: 'session added', severity: 'success' }));
    dispatch(successUpdateSessionType(newSessionType));
  }).catch(err => {
    dispatch(setFlash({ open: true, message: 'There is an error', severity: 'error' }));
    dispatch(errorUpdateSessionType(err));
  });
};

export {
  clearUser,
  setUser,
  setSchedule,
  fetchUserByToken,
  updateSchedule,
  updateProfil,
  updateSessionType,
};

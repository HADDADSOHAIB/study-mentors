import {
  SET_USER,
  CLEAR_USER,
  SET_SCHEDULE,
} from './authTypes';

const setUser = (currentUser, accountType) => ({
  type: SET_USER,
  payload: {
    currentUser,
    accountType,
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

export {
  clearUser,
  setUser,
  setSchedule,
};

import {
  SET_USER,
  CLEAR_USER,
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

export {
  clearUser,
  setUser,
};

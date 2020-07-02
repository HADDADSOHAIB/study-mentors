import {
  SET_USER,
  CLEAR_USER,
  SET_SCHEDULE,
} from '../actions/authTypes';

const INITIAL_STATE = {
  currentUser: null,
  accountType: null,
  categories: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: payload.currentUser,
        accountType: payload.accountType,
        categories: payload.categories,
      };
    case CLEAR_USER:
      return {
        currentUser: null,
        accountType: null,
        categories: null,
      };
    case SET_SCHEDULE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          schedule: payload.schedule,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;

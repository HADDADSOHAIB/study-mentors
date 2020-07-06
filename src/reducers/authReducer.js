import {
  SET_USER,
  CLEAR_USER,
  SET_SCHEDULE,
  START_FETCH_USER_BY_TOKEN,
  SUCCESS_FETCH_USER_BY_TOKEN,
  ERROR_FETCH_USER_BY_TOKEN,
} from '../actions/authTypes';

const INITIAL_STATE = {
  loading: false,
  currentUser: {},
  accountType: '',
  categories: [],
  error: null,
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
    case START_FETCH_USER_BY_TOKEN:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_FETCH_USER_BY_TOKEN:
      return {
        ...state,
        currentUser: payload.currentUser,
        accountType: payload.accountType,
        categories: payload.categories,
        loading: true,
      };
    case ERROR_FETCH_USER_BY_TOKEN:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    case CLEAR_USER:
      return {
        currentUser: {},
        accountType: '',
        categories: [],
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

export { INITIAL_STATE };
export default authReducer;

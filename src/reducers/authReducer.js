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
  ERROR_UPDATE_SESSION_TYPE,
  SUCCESS_UPDATE_SESSION_TYPE,
  START_SIGN_IN,
  SUCCESS_SIGN_IN,
  ERROR_SIGN_IN,
} from '../actions/authTypes';
import {
  CLEAR_REDIRECT,
} from '../actions/bookingTypes';

const INITIAL_STATE = {
  loading: false,
  currentUser: {},
  accountType: '',
  categories: [],
  error: null,
  redirect: false,
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
        loading: false,
      };
    case START_FETCH_USER_BY_TOKEN:
    case START_UPDATE_SCHEDULE:
    case START_UPDATE_PROFIL:
    case START_UPDATE_SESSION_TYPE:
    case START_SIGN_IN:
      return {
        ...state,
        loading: true,
      };
    case ERROR_FETCH_USER_BY_TOKEN:
    case ERROR_UPDATE_SCHEDULE:
    case ERROR_UPDATE_PROFIL:
    case ERROR_UPDATE_SESSION_TYPE:
    case ERROR_SIGN_IN:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: {},
        accountType: '',
        categories: [],
      };
    case CLEAR_REDIRECT:
      return {
        ...state,
        redirect: false,
      };
    case SET_SCHEDULE:
      return {
        ...state,
        loading: false,
        currentUser: {
          ...state.currentUser,
          schedule: payload.schedule,
        },
      };
    case SUCCESS_UPDATE_SESSION_TYPE:
      return {
        ...state,
        loading: false,
        currentUser: {
          ...state.currentUser,
          session_type: payload.sessionType,
        },
      };
    case SUCCESS_SIGN_IN:
      return {
        ...state,
        loading: false,
        redirect: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export { INITIAL_STATE };
export default authReducer;

import {
  START_FETCHING_MY_BOOKING,
  SUCCESS_FETCHING_MY_BOOKING,
  ERROR_FETCHING_MY_BOOKING,
  SUCCESS_MAKING_A_BOOKING,
  START_MAKING_A_BOOKING,
  ERROR_MAKING_A_BOOKING,
  CLEAR_REDIRECT,
} from '../actions/bookingTypes';

const INITIAL_STATE = {
  myBookings: [],
  loading: false,
  error: null,
  redirect: false,
};

const bookingReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case START_FETCHING_MY_BOOKING:
    case START_MAKING_A_BOOKING:
      return {
        ...state,
        loading: true,
      };
    case ERROR_FETCHING_MY_BOOKING:
    case ERROR_MAKING_A_BOOKING:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    case SUCCESS_FETCHING_MY_BOOKING:
      return {
        ...state,
        myBookings: payload.bookings,
      };
    case SUCCESS_MAKING_A_BOOKING:
      return {
        ...state,
        redirect: true,
      };
    case CLEAR_REDIRECT:
      return {
        ...state,
        redirect: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export { INITIAL_STATE };
export default bookingReducer;

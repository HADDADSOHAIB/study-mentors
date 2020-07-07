import {
  START_FETCHING_MY_BOOKING,
  SUCCESS_FETCHING_MY_BOOKING,
  ERROR_FETCHING_MY_BOOKING,
} from '../actions/bookingTypes';

const INITIAL_STATE = {
  myBookings: [],
  loading: false,
  error: null,
};

const bookingReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case START_FETCHING_MY_BOOKING:
      return {
        ...state,
        loading: true,
      };
    case ERROR_FETCHING_MY_BOOKING:
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
    default:
      return {
        ...state,
      };
  }
};

export { INITIAL_STATE };
export default bookingReducer;

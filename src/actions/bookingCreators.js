import axios from 'axios';
// import { setFlash } from './layoutCreators';
import BACKEND from '../backend';
import {
  START_FETCHING_MY_BOOKING,
  SUCCESS_FETCHING_MY_BOOKING,
  ERROR_FETCHING_MY_BOOKING,
  START_MAKING_A_BOOKING,
  SUCCESS_MAKING_A_BOOKING,
  ERROR_MAKING_A_BOOKING,
  CLEAR_REDIRECT,
} from './bookingTypes';
import { setFlash } from './layoutCreators';

const startFetchingMyBooking = () => ({
  type: START_FETCHING_MY_BOOKING,
});

const successFetchingMyBooking = bookings => ({
  type: SUCCESS_FETCHING_MY_BOOKING,
  payload: {
    bookings,
  },
});

const errorFetchingMyBooking = error => ({
  type: ERROR_FETCHING_MY_BOOKING,
  payload: {
    error,
  },
});

const fetchMyBooking = (currentUser, accountType) => dispatch => {
  dispatch(startFetchingMyBooking());
  axios.post(`${BACKEND}/api/v1/bookings/my_bookings`, {
    account_type: accountType,
    id: currentUser.id,
  }, { headers: { Authorization: `Bearer ${localStorage.getItem('token_auth')}` } })
    .then(res => dispatch(successFetchingMyBooking(res.data.bookings)))
    .then(err => dispatch(errorFetchingMyBooking(err)));
};

const startMakingABooking = () => ({
  type: START_MAKING_A_BOOKING,
});

const errorMakingABooking = error => ({
  type: ERROR_MAKING_A_BOOKING,
  payload: {
    error,
  },
});

const successMakingABooking = () => ({
  type: SUCCESS_MAKING_A_BOOKING,
});

const makeABooking = booking => dispatch => {
  dispatch(startMakingABooking());
  axios.post(`${BACKEND}/api/v1/bookings`, booking,
    { headers: { Authorization: `Bearer ${localStorage.getItem('token_auth')}` } })
    .then(() => {
      dispatch(successMakingABooking());
      dispatch(setFlash({ open: true, message: 'Session booked successfuly', severity: 'success' }));
    }).catch(err => dispatch(errorMakingABooking(err)));
};

const clearRedirect = () => ({
  type: CLEAR_REDIRECT,
});

export {
  fetchMyBooking,
  makeABooking,
  clearRedirect,
};

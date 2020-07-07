import axios from 'axios';
// import { setFlash } from './layoutCreators';
import BACKEND from '../backend';
import {
  START_FETCHING_MY_BOOKING,
  SUCCESS_FETCHING_MY_BOOKING,
  ERROR_FETCHING_MY_BOOKING,
} from './bookingTypes';

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

export {
  fetchMyBooking,
  successFetchingMyBooking,
};

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import authHeader from '../authHeader';
import BACKEND from '../backend';
import formatter from '../utils/minuteFormatter';
import useStyles from './MyBookingsPageStyles';

function MyBookingsPage({ currentUser, accountType }) {
  const classes = useStyles();

  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    if (Object.keys(currentUser).length && accountType) {
      axios.post(`${BACKEND}/api/v1/bookings/my_bookings`, {
        account_type: accountType,
        id: currentUser.id,
      }, { headers: authHeader })
        .then(res => setBookings(res.data.bookings));
    }
    return () => '';
  }, [currentUser, accountType]);
  return (
    <div className={classes.root}>
      <div>
        <h1 align="center">
          Bookings
        </h1>
      </div>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Teacher</TableCell>
              <TableCell align="right">Student</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Session Type</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length ? bookings.map(booking => (
              <TableRow key={booking.id}>
                <TableCell component="th" scope="row">
                  {booking.teacher.fullname}
                </TableCell>
                <TableCell align="right">{booking.student.fullname}</TableCell>
                <TableCell align="right">{booking.category && booking.category.name}</TableCell>
                <TableCell align="right">{booking.session_type}</TableCell>
                <TableCell align="right">{booking.date}</TableCell>
                <TableCell align="right">
                  {new Date(booking.from).getHours()}
                  :
                  {formatter(new Date(booking.from).getMinutes())}
                  -
                  {new Date(booking.to).getHours()}
                  :
                  {formatter(new Date(booking.to).getMinutes())}
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  <span>You don&rsquo;t have any bookings yet</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  accountType: state.auth.accountType,
});

MyBookingsPage.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  accountType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(MyBookingsPage);

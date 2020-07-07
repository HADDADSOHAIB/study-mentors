import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uid from 'uid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import CardContent from '@material-ui/core/CardContent';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import makeStyle from './MakeBookingPageStyles';
import { setFlash } from '../actions/layoutCreators';
import { makeABooking } from '../actions/bookingCreators';
import { fetchSelectedTeacher } from '../actions/teacherCreators';

const MakeBookingPage = ({
  match,
  setFlash,
  makeABooking,
  currentUser,
  fetchSelectedTeacher,
  selectedTeacher,
  redirect,
  history,
}) => {
  const classes = makeStyle();
  const [categoryId, setCategoryId] = useState('');
  const [type, setType] = useState('');
  const [to, setTo] = useState(new Date());
  const [from, setFrom] = useState(new Date());

  const handleDateChange = date => {
    setTo(date);
    setFrom(date);
  };
  const handleFromChange = date => setFrom(date);
  const handleToChange = date => setTo(date);
  const handleCategoryChange = e => setCategoryId(parseInt(e.target.value, 10));
  const handleTypeChange = e => setType(e.target.value);
  const handleMakeBooking = () => {
    if (to.getHours() === from.getHours() && to.getMinutes() === from.getMinutes()) {
      setFlash({ open: true, message: 'the to and from fields should not be the same', severity: 'warning' });
    } else if (!categoryId) {
      setFlash({ open: true, message: 'Please, choose a category', severity: 'warning' });
    } else if (!type) {
      setFlash({ open: true, message: 'Please, choose a type', severity: 'warning' });
    } else {
      const booking = {
        teacher_id: selectedTeacher.teacher.id,
        student_id: currentUser.id,
        type,
        category_id: categoryId,
        from,
        to,
      };
      makeABooking(booking);
    }
  };

  useEffect(() => {
    fetchSelectedTeacher(match.params.id);
    return () => '';
  }, []);

  useEffect(() => {
    if (redirect) {
      history.push('/');
    }
    return () => '';
  }, [redirect]);

  return (
    <div>
      {
        selectedTeacher.teacher ? (
          <div className={classes.root}>
            <div className={classes.info}>
              <Card className={classes.card}>
                <AppBar position="static" classes={{ root: classes.appbar }}>
                  <Tabs value={0} centered>
                    <Tab label={selectedTeacher.teacher && `Book with ${selectedTeacher.teacher.fullname}`} id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                  </Tabs>
                </AppBar>
                <CardContent>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="Choose session date"
                        value={from}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      <div className={classes.times}>
                        <KeyboardTimePicker
                          margin="normal"
                          label="Start from"
                          value={from}
                          onChange={handleFromChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change time',
                          }}
                        />
                        <KeyboardTimePicker
                          margin="normal"
                          label="To"
                          value={to}
                          onChange={handleToChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change time',
                          }}
                        />
                      </div>
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <FormControl variant="outlined" size="small" fullWidth className={classes.margin}>
                    <InputLabel id="category">Choose a category</InputLabel>
                    <Select
                      labelId="category"
                      value={categoryId}
                      onChange={handleCategoryChange}
                    >
                      {
                        selectedTeacher.categories && selectedTeacher.categories
                          .map(cat => (
                            <MenuItem key={uid(12)} value={cat.id}>
                              {cat.name}
                            </MenuItem>
                          ))
                      }
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined" size="small" fullWidth className={classes.margin}>
                    <InputLabel id="category">Choose a session type</InputLabel>
                    <Select
                      labelId="type"
                      value={type}
                      onChange={handleTypeChange}
                    >
                      {
                        selectedTeacher.teacher && selectedTeacher.teacher.session_type
                          .split(',')
                          .map(type => (
                            <MenuItem key={uid(12)} value={type}>
                              {type}
                            </MenuItem>
                          ))
                      }
                    </Select>
                  </FormControl>
                  <div className={classes.makebooking}>
                    <Button variant="outlined" color="primary" onClick={handleMakeBooking}>
                      make the booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <p align="center">There is no teacher with this id</p>
        )
      }
    </div>
  );
};

MakeBookingPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  makeABooking: PropTypes.func.isRequired,
  setFlash: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  history: PropTypes.arrayOf(Object).isRequired,
  fetchSelectedTeacher: PropTypes.func.isRequired,
  selectedTeacher: PropTypes.shape({
    teacher: PropTypes.shape({
      id: PropTypes.number,
      session_type: PropTypes.string,
      fullname: PropTypes.string,
    }),
    categories: PropTypes.arrayOf(Object),
  }).isRequired,
  redirect: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  makeABooking: booking => dispatch(makeABooking(booking)),
  setFlash: flash => dispatch(setFlash(flash)),
  fetchSelectedTeacher: id => dispatch(fetchSelectedTeacher(id)),
});

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  selectedTeacher: state.teacher.selectedTeacher,
  redirect: state.booking.redirect,
});

export default connect(mapStateToProps, mapDispatchToProps)(MakeBookingPage);

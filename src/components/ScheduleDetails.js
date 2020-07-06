import React from 'react';
import uid from 'uid';
import axios from 'axios';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { setSchedule, updateSchedule } from '../actions/authCreators';
import useStyles from './ScheduleDetailsStyles';
import authHeadre from '../authHeader';
import BACKEND from '../backend';
import { setFlash } from '../actions/layoutCreators';

const ScheduleDetails = ({
  schedule,
  setSchedule,
  currentUser,
  setFlash,
  options,
  updateSchedule,
}) => {
  const classes = useStyles();

  const handleDeleteSession = (day, i) => {
    const currentSchedule = schedule;
    currentSchedule[day] = currentSchedule[day].filter((el, j) => i !== j);
    updateSchedule(currentSchedule, currentUser);
    // axios.put(`${BACKEND}/api/v1/teachers/${currentUser.id}/update_schedule`, {
    //   schedule: currentSchedule,
    // }, { headers: authHeadre }).then(() => {
    //   setSchedule(currentSchedule);
    //   setFlash({ open: true, message: 'schedule updated', severity: 'success' });
    // }).catch(() => {
    //   setFlash({ open: true, message: 'There is an error', severity: 'error' });
    // });
  };

  const sessionChip = (session, i, day) => (options ? (
    <Chip label={session} key={uid(12)} onDelete={() => handleDeleteSession(day, i)} color="primary" variant="outlined" />
  ) : (
    <Chip label={session} key={uid(12)} color="primary" variant="outlined" />
  ));

  return (
    <div>
      <div className={classes.session}>
        <div className={classes.sessionTitles}>
          <Typography color="textPrimary" variant="body1" display="inline">
            Monday:
          </Typography>
        </div>
        <div className={classes.chips}>
          {
            schedule.monday && schedule.monday.length ? schedule.monday.map((session, i) => (
              sessionChip(session, i, 'monday')
            )) : (
              <p className={classes.chip}>no schedule is set for this day</p>
            )
          }
        </div>
      </div>
      <div className={classes.session}>
        <div className={classes.sessionTitles}>
          <Typography color="textPrimary" variant="body1" display="inline">
            Tuesday:
          </Typography>
        </div>
        <div className={classes.chips}>
          {
            schedule.tuesday && schedule.tuesday.length ? schedule.tuesday.map((session, i) => (
              sessionChip(session, i, 'tuesday')
            )) : (
              <p className={classes.chip}>no schedule is set for this day</p>
            )
          }
        </div>
      </div>
      <div className={classes.session}>
        <div className={classes.sessionTitles}>
          <Typography color="textPrimary" variant="body1" display="inline">
            Wednesday:
          </Typography>
        </div>
        <div className={classes.chips}>
          {
            schedule.wednesday && schedule.wednesday.length
              ? schedule.wednesday.map((session, i) => (
                sessionChip(session, i, 'wednesday')
              )) : (
                <p className={classes.chip}>no schedule is set for this day</p>
              )
          }
        </div>
      </div>
      <div className={classes.session}>
        <div className={classes.sessionTitles}>
          <Typography color="textPrimary" variant="body1" display="inline">
            Thursday:
          </Typography>
        </div>
        <div className={classes.chips}>
          {
            schedule.thursday && schedule.thursday.length ? schedule.thursday.map((session, i) => (
              sessionChip(session, i, 'thursday')
            )) : (
              <p className={classes.chip}>no schedule is set for this day</p>
            )
          }
        </div>
      </div>
      <div className={classes.session}>
        <div className={classes.sessionTitles}>
          <Typography color="textPrimary" variant="body1" display="inline">
            Friday:
          </Typography>
        </div>
        <div className={classes.chips}>
          {
            schedule.friday && schedule.friday.length ? schedule.friday.map((session, i) => (
              sessionChip(session, i, 'friday')
            )) : (
              <p className={classes.chip}>no schedule is set for this day</p>
            )
          }
        </div>
      </div>
      <div className={classes.session}>
        <div className={classes.sessionTitles}>
          <Typography color="textPrimary" variant="body1" display="inline">
            Saturday:
          </Typography>
        </div>
        <div className={classes.chips}>
          {
            schedule.saturday && schedule.saturday.length ? schedule.saturday.map((session, i) => (
              sessionChip(session, i, 'saturday')
            )) : (
              <p className={classes.chip}>no schedule is set for this day</p>
            )
          }
        </div>
      </div>
      <div className={classes.session}>
        <div className={classes.sessionTitles}>
          <Typography color="textPrimary" variant="body1" display="inline">
            Sunday:
          </Typography>
        </div>
        <div className={classes.chips}>
          {
            schedule.sunday && schedule.sunday.length ? schedule.sunday.map((session, i) => (
              sessionChip(session, i, 'sunday')
            )) : (
              <p className={classes.chip}>no schedule is set for this day</p>
            )
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  setSchedule: schedule => dispatch(setSchedule(schedule)),
  setFlash: flash => dispatch(setFlash(flash)),
  updateSchedule: (schedule, user) => dispatch(updateSchedule(schedule, user)),
});

ScheduleDetails.propTypes = {
  schedule: PropTypes.shape({
    monday: PropTypes.arrayOf(Object),
    tuesday: PropTypes.arrayOf(Object),
    wednesday: PropTypes.arrayOf(Object),
    thursday: PropTypes.arrayOf(Object),
    friday: PropTypes.arrayOf(Object),
    saturday: PropTypes.arrayOf(Object),
    sunday: PropTypes.arrayOf(Object),
  }).isRequired,
  setSchedule: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  setFlash: PropTypes.func.isRequired,
  options: PropTypes.bool,
  updateSchedule: PropTypes.func.isRequired,
};

ScheduleDetails.defaultProps = {
  options: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDetails);
